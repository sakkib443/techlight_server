// ===================================================================
// Techlight IT Institute LMS - Certificate Batch Controller
// HTTP request handlers for the certificate-only batch.
// ===================================================================

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import pick from '../../utils/pick';
import { CertificateBatchService } from './certificateBatch.service';

const createBatch = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateBatchService.createBatch(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Batch created successfully',
        data: result,
    });
});

const getAllBatches = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['isActive', 'searchTerm']) as {
        isActive?: string;
        searchTerm?: string;
    };

    const result = await CertificateBatchService.getAllBatches({
        searchTerm: filters.searchTerm,
        isActive:
            filters.isActive === undefined ? undefined : filters.isActive === 'true',
    });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Batches retrieved successfully',
        data: result,
    });
});

const getBatchById = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateBatchService.getBatchById(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Batch retrieved successfully',
        data: result,
    });
});

const updateBatch = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateBatchService.updateBatch(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Batch updated successfully',
        data: result,
    });
});

const deleteBatch = catchAsync(async (req: Request, res: Response) => {
    const result = await CertificateBatchService.deleteBatch(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Batch deleted successfully',
        data: result,
    });
});

export const CertificateBatchController = {
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch,
};
