import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import pick from '../../utils/pick';
import { ReviewService } from './review.service';

// ==================== Create Review (Authenticated) ====================
const createReview = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.createReview(req.user!.userId, req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Review submitted successfully',
        data: result,
    });
});

// ==================== Get Approved Reviews (Public) ====================
const getApprovedReviews = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.getApprovedReviews();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Reviews retrieved successfully',
        data: result,
    });
});

// ==================== Get All Reviews (Admin) ====================
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['status']);
    const options = pick(req.query, ['page', 'limit']);

    const result = await ReviewService.getAllReviews(filters, {
        page: Number(options.page) || 1,
        limit: Number(options.limit) || 50,
    });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Reviews retrieved successfully',
        meta: {
            ...result.meta,
            totalPages: Math.ceil(result.meta.total / result.meta.limit),
        },
        data: result.data,
    });
});

// ==================== Update Status (Admin) ====================
const updateStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.updateStatus(req.params.id, req.body.status);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Review status updated successfully',
        data: result,
    });
});

// ==================== Delete Review (Admin) ====================
const deleteReview = catchAsync(async (req: Request, res: Response) => {
    await ReviewService.deleteReview(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Review deleted successfully',
        data: null,
    });
});

export const ReviewController = {
    createReview,
    getApprovedReviews,
    getAllReviews,
    updateStatus,
    deleteReview,
};
