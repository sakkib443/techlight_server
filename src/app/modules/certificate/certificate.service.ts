// ===================================================================
// Techlight IT Institute LMS - Certificate Service
// Business logic for Certificate operations
// সার্টিফিকেট সার্ভিস - ব্যবসায়িক লজিক
// ===================================================================

import { ICertificate, ICertificateFilters } from './certificate.interface';
import { Certificate } from './certificate.model';
import { Enrollment } from '../enrollment/enrollment.model';
import { Course } from '../course/course.model';
import { User } from '../user/user.model';
import AppError from '../../utils/AppError';

interface IIssueCertificatePayload {
    enrollmentId?: string;
    studentId?: string;
    courseId?: string;
    batchId?: string;
    title?: string;
    grade?: string;
    issueDate?: string;
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

// ==================== Issue Certificate ====================
const issueCertificate = async (payload: IIssueCertificatePayload): Promise<ICertificate> => {
    let studentId = payload.studentId;
    let courseId = payload.courseId;
    let batchId = payload.batchId;

    // Resolve from enrollment if provided
    let enrollment = null;
    if (payload.enrollmentId) {
        enrollment = await Enrollment.findById(payload.enrollmentId);
        if (!enrollment) {
            throw new AppError(404, 'Enrollment not found');
        }
        studentId = enrollment.student.toString();
        courseId = enrollment.course.toString();
        if (enrollment.batch && !batchId) {
            batchId = enrollment.batch.toString();
        }
    }

    if (!studentId || !courseId) {
        throw new AppError(400, 'Student and course are required to issue a certificate');
    }

    // Validate student and course exist
    const student = await User.findById(studentId);
    if (!student) {
        throw new AppError(404, 'Student not found');
    }

    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError(404, 'Course not found');
    }

    // Prevent duplicate certificate for the same student + course
    const existing = await Certificate.findOne({ student: studentId, course: courseId });
    if (existing) {
        throw new AppError(400, 'A certificate has already been issued for this student and course');
    }

    // Fall back to finding the enrollment (for linking) if not passed
    if (!enrollment) {
        enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
        if (enrollment?.batch && !batchId) {
            batchId = enrollment.batch.toString();
        }
    }

    const certificateNumber = await generateCertificateNumber();
    const studentName = `${student.firstName} ${student.lastName || ''}`.trim();

    const certificate = await Certificate.create({
        certificateNumber,
        student: studentId,
        course: courseId,
        enrollment: enrollment?._id,
        batch: batchId || undefined,
        title: payload.title?.trim() || course.title,
        studentName,
        courseName: course.title,
        grade: payload.grade,
        issuedBy: payload.issuedBy,
        issueDate: payload.issueDate ? new Date(payload.issueDate) : new Date(),
    });

    // Link certificate to the enrollment
    if (enrollment) {
        await Enrollment.findByIdAndUpdate(enrollment._id, {
            certificateId: certificate._id,
            certificateEligible: true,
        });
    }

    // Link certificate to the user
    await User.findByIdAndUpdate(studentId, {
        $addToSet: { certificates: certificate._id },
    });

    return certificate;
};

// ==================== Get All Certificates (Admin) ====================
const getAllCertificates = async (
    filters: ICertificateFilters,
    options: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' }
): Promise<{ data: ICertificate[]; meta: { total: number; page: number; limit: number } }> => {
    const { student, course, batch, status, searchTerm } = filters;
    const { page = 1, limit = 10, sortBy = 'issueDate', sortOrder = 'desc' } = options;

    const query: Record<string, unknown> = {};

    if (student) query.student = student;
    if (course) query.course = course;
    if (batch) query.batch = batch;
    if (status) query.status = status;

    if (searchTerm) {
        query.$or = [
            { certificateNumber: { $regex: searchTerm, $options: 'i' } },
            { studentName: { $regex: searchTerm, $options: 'i' } },
            { courseName: { $regex: searchTerm, $options: 'i' } },
            { title: { $regex: searchTerm, $options: 'i' } },
        ];
    }

    const total = await Certificate.countDocuments(query);
    const certificates = await Certificate.find(query)
        .populate('student', 'firstName lastName email avatar')
        .populate('course', 'title slug thumbnail')
        .populate('batch', 'batchName batchCode')
        .populate('issuedBy', 'firstName lastName')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        data: certificates,
        meta: { total, page, limit },
    };
};

// ==================== Get My Certificates (Student) ====================
const getMyCertificates = async (studentId: string): Promise<ICertificate[]> => {
    const certificates = await Certificate.find({ student: studentId, status: 'issued' })
        .populate('course', 'title slug thumbnail')
        .populate('batch', 'batchName batchCode')
        .sort({ issueDate: -1 });

    return certificates;
};

// ==================== Get Single Certificate ====================
const getCertificateById = async (id: string): Promise<ICertificate> => {
    const certificate = await Certificate.findById(id)
        .populate('student', 'firstName lastName email avatar')
        .populate('course', 'title slug thumbnail')
        .populate('batch', 'batchName batchCode')
        .populate('issuedBy', 'firstName lastName');

    if (!certificate) {
        throw new AppError(404, 'Certificate not found');
    }
    return certificate;
};

// ==================== Verify Certificate (Public) ====================
const verifyCertificate = async (certificateNumber: string): Promise<ICertificate> => {
    const certificate = await Certificate.findOne({
        certificateNumber: certificateNumber.toUpperCase().trim(),
    })
        .populate('course', 'title')
        .populate('batch', 'batchName batchCode');

    if (!certificate) {
        throw new AppError(404, 'Certificate not found. Please check the certificate number.');
    }
    return certificate;
};

// ==================== Update Certificate (Admin) ====================
const updateCertificate = async (id: string, payload: Partial<ICertificate>): Promise<ICertificate> => {
    const certificate = await Certificate.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .populate('student', 'firstName lastName email avatar')
        .populate('course', 'title slug thumbnail')
        .populate('batch', 'batchName batchCode');

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

    // Unlink from enrollment
    if (certificate.enrollment) {
        await Enrollment.findByIdAndUpdate(certificate.enrollment, {
            $unset: { certificateId: 1 },
            $set: { certificateEligible: false },
        });
    }

    // Unlink from user
    await User.findByIdAndUpdate(certificate.student, {
        $pull: { certificates: certificate._id },
    });

    return certificate;
};

export const CertificateService = {
    generateCertificateNumber,
    issueCertificate,
    getAllCertificates,
    getMyCertificates,
    getCertificateById,
    verifyCertificate,
    updateCertificate,
    deleteCertificate,
};
