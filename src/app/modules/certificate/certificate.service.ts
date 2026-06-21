// ===================================================================
// Techlight IT Institute LMS - Certificate Service
// Business logic for the standalone certificate.
// ===================================================================

import { ICertificate, ICertificateFilters, ICertificateSearch } from './certificate.interface';
import { Certificate } from './certificate.model';
import { CertificateBatch } from '../certificateBatch/certificateBatch.model';
import AppError from '../../utils/AppError';

interface IIssueCertificatePayload {
    studentName: string;
    phone: string;
    email?: string;
    studentId: string;
    courseName?: string;
    grade?: string;
    certificateBatch?: string;
    batchNumber?: string;
    batchName?: string;
    mentorName?: string;
    startDate?: string;
    endDate?: string;
    durationHours?: number | string;
    issueDate?: string;
    signatureName?: string;
    signatureDesignation?: string;
    issuedBy?: string;
}

// ==================== Generate Certificate Number ====================
// Format: TII-YYYY-#### (e.g. TII-2026-0001)
const generateCertificateNumber = async (): Promise<string> => {
    const year = new Date().getFullYear();
    const prefix = `TII-${year}-`;

    const last = await Certificate.findOne({ certificateNumber: { $regex: `^${prefix}` } })
        .sort({ certificateNumber: -1 })
        .lean();

    let seq = 1;
    if (last?.certificateNumber) {
        const lastSeq = parseInt(last.certificateNumber.split('-')[2], 10);
        if (!isNaN(lastSeq)) {
            seq = lastSeq + 1;
        }
    }

    return `${prefix}${String(seq).padStart(4, '0')}`;
};

// ==================== Issue Certificate (Admin) ====================
const issueCertificate = async (payload: IIssueCertificatePayload): Promise<ICertificate> => {
    // Snapshot batch fields if a batch is linked
    let batchSnapshot: Partial<ICertificate> = {
        batchNumber: payload.batchNumber,
        batchName: payload.batchName,
        mentorName: payload.mentorName,
        startDate: payload.startDate ? new Date(payload.startDate) : undefined,
        endDate: payload.endDate ? new Date(payload.endDate) : undefined,
    };
    let courseName = payload.courseName;

    if (payload.certificateBatch) {
        const batch = await CertificateBatch.findById(payload.certificateBatch);
        if (!batch) {
            throw new AppError(404, 'Selected batch not found');
        }
        batchSnapshot = {
            batchNumber: batch.batchNumber,
            batchName: batch.batchName,
            mentorName: batch.mentorName,
            startDate: batch.startDate,
            endDate: batch.endDate,
        };
        if (!courseName) courseName = batch.courseName;
    }

    // Prevent the exact same certificate twice (same student id + batch)
    const existing = await Certificate.findOne({
        studentId: payload.studentId,
        certificateBatch: payload.certificateBatch || undefined,
    });
    if (existing && payload.certificateBatch) {
        throw new AppError(400, 'A certificate already exists for this student in this batch');
    }

    const certificateNumber = await generateCertificateNumber();

    const certificate = await Certificate.create({
        certificateNumber,
        studentName: payload.studentName.trim(),
        phone: payload.phone.trim(),
        email: payload.email?.trim() || '',
        studentId: payload.studentId.trim(),
        courseName: courseName || '',
        grade: payload.grade || '',
        certificateBatch: payload.certificateBatch || undefined,
        ...batchSnapshot,
        durationHours:
            payload.durationHours !== undefined && payload.durationHours !== ''
                ? Number(payload.durationHours)
                : undefined,
        signatureName: payload.signatureName?.trim() || '',
        signatureDesignation: payload.signatureDesignation?.trim() || '',
        issuedBy: payload.issuedBy,
        issueDate: payload.issueDate ? new Date(payload.issueDate) : new Date(),
    });

    return certificate;
};

// ==================== Get All Certificates (Admin) ====================
const getAllCertificates = async (
    filters: ICertificateFilters,
    options: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' }
): Promise<{ data: ICertificate[]; meta: { total: number; page: number; limit: number } }> => {
    const { status, certificateBatch, searchTerm } = filters;
    const { page = 1, limit = 10, sortBy = 'issueDate', sortOrder = 'desc' } = options;

    const query: Record<string, unknown> = {};

    if (status) query.status = status;
    if (certificateBatch) query.certificateBatch = certificateBatch;

    if (searchTerm) {
        query.$or = [
            { certificateNumber: { $regex: searchTerm, $options: 'i' } },
            { studentName: { $regex: searchTerm, $options: 'i' } },
            { studentId: { $regex: searchTerm, $options: 'i' } },
            { phone: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
            { courseName: { $regex: searchTerm, $options: 'i' } },
        ];
    }

    const total = await Certificate.countDocuments(query);
    const certificates = await Certificate.find(query)
        .populate('certificateBatch', 'batchName batchNumber mentorName startDate endDate')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        data: certificates,
        meta: { total, page, limit },
    };
};

// ==================== Search Certificates (Public) ====================
// Match by phone OR email OR studentId — any provided field.
const searchCertificates = async (payload: ICertificateSearch): Promise<ICertificate[]> => {
    const { phone, email, studentId } = payload;

    const or: Record<string, unknown>[] = [];
    if (phone) or.push({ phone: { $regex: phone.trim(), $options: 'i' } });
    if (email) or.push({ email: { $regex: email.trim(), $options: 'i' } });
    if (studentId) or.push({ studentId: { $regex: studentId.trim(), $options: 'i' } });

    if (or.length === 0) {
        return [];
    }

    return Certificate.find({ status: 'issued', $or: or })
        .populate('certificateBatch', 'batchName batchNumber mentorName startDate endDate')
        .sort({ issueDate: -1 });
};

// ==================== Get My Certificates (Student) ====================
// Standalone certs are matched to the logged-in user by email.
const getMyCertificates = async (email: string): Promise<ICertificate[]> => {
    if (!email) return [];
    return Certificate.find({ email: email.toLowerCase().trim(), status: 'issued' })
        .populate('certificateBatch', 'batchName batchNumber mentorName startDate endDate')
        .sort({ issueDate: -1 });
};

// ==================== Get Single Certificate ====================
const getCertificateById = async (id: string): Promise<ICertificate> => {
    const certificate = await Certificate.findById(id).populate(
        'certificateBatch',
        'batchName batchNumber mentorName startDate endDate'
    );

    if (!certificate) {
        throw new AppError(404, 'Certificate not found');
    }
    return certificate;
};

// ==================== Verify Certificate (Public) ====================
const verifyCertificate = async (certificateNumber: string): Promise<ICertificate> => {
    const certificate = await Certificate.findOne({
        certificateNumber: certificateNumber.toUpperCase().trim(),
    }).populate('certificateBatch', 'batchName batchNumber mentorName startDate endDate');

    if (!certificate) {
        throw new AppError(404, 'Certificate not found. Please check the certificate number.');
    }
    return certificate;
};

// ==================== Update Certificate (Admin) ====================
const updateCertificate = async (id: string, payload: Partial<ICertificate>): Promise<ICertificate> => {
    const data: Record<string, unknown> = { ...payload };
    if (payload.startDate) data.startDate = new Date(payload.startDate);
    if (payload.endDate) data.endDate = new Date(payload.endDate);
    if (payload.issueDate) data.issueDate = new Date(payload.issueDate);

    const certificate = await Certificate.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).populate('certificateBatch', 'batchName batchNumber mentorName startDate endDate');

    if (!certificate) {
        throw new AppError(404, 'Certificate not found');
    }
    return certificate;
};

// ==================== Delete Certificate (Admin) ====================
const deleteCertificate = async (id: string): Promise<ICertificate> => {
    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) {
        throw new AppError(404, 'Certificate not found');
    }
    return certificate;
};

export const CertificateService = {
    generateCertificateNumber,
    issueCertificate,
    getAllCertificates,
    searchCertificates,
    getMyCertificates,
    getCertificateById,
    verifyCertificate,
    updateCertificate,
    deleteCertificate,
};
