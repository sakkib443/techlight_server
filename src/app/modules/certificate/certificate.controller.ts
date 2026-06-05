// ===================================================================
// Techlight IT Institute LMS - Certificate Controller
// HTTP request handlers for the standalone certificate.
// ===================================================================

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CertificateService } from './certificate.service';
import pick from '../../utils/pick';

// ==================== Issue Certificate (Admin) ====================
const issueCertificate = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateService.issueCertificate({
        ...req.body,
        issuedBy: req.user!.userId,
    });
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Certificate issued successfully',
        data: result,
    });
});

// ==================== Get All Certificates (Admin) ====================
const getAllCertificates = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['status', 'certificateBatch', 'searchTerm']);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await CertificateService.getAllCertificates(filters, {
        page: Number(options.page) || 1,
        limit: Number(options.limit) || 10,
        sortBy: options.sortBy as string,
        sortOrder: options.sortOrder as 'asc' | 'desc',
    });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Certificates retrieved successfully',
        meta: {
            ...result.meta,
            totalPages: Math.ceil(result.meta.total / result.meta.limit),
        },
        data: result.data,
    });
});

// ==================== Search Certificates (Public) ====================
const searchCertificates = catchAsync(async (req: Request, res: Response) => {
    const { phone, email, studentId } = pick(req.query, ['phone', 'email', 'studentId']) as {
        phone?: string;
        email?: string;
        studentId?: string;
    };

    const result = await CertificateService.searchCertificates({ phone, email, studentId });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Certificates retrieved successfully',
        data: result,
    });
});

// ==================== Get My Certificates (Student) ====================
const getMyCertificates = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateService.getMyCertificates(req.user!.email);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'My certificates retrieved successfully',
        data: result,
    });
});

// ==================== Get Single Certificate ====================
const getCertificateById = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateService.getCertificateById(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Certificate retrieved successfully',
        data: result,
    });
});

// ==================== Verify Certificate (Public) ====================
const verifyCertificate = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateService.verifyCertificate(req.params.number);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Certificate is valid',
        data: result,
    });
});

// ==================== Update Certificate (Admin) ====================
const updateCertificate = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateService.updateCertificate(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Certificate updated successfully',
        data: result,
    });
});

// ==================== Delete Certificate (Admin) ====================
const deleteCertificate = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateService.deleteCertificate(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Certificate deleted successfully',
        data: result,
    });
});

export const CertificateController = {
    issueCertificate,
    getAllCertificates,
    searchCertificates,
    getMyCertificates,
    getCertificateById,
    verifyCertificate,
    updateCertificate,
    deleteCertificate,
};
