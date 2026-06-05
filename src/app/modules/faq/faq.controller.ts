// ===================================================================
// Techlight IT Institute Backend - FAQ Controller
// FAQ এর HTTP request handling
// ===================================================================

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FaqService from './faq.service';

const FaqController = {
    // ==================== GET ACTIVE (Public) ====================
    getActiveFaqs: catchAsync(async (req: Request, res: Response) => {
        const { category } = req.query;
        const faqs = await FaqService.getActiveFaqs(category as string);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'FAQs fetched successfully',
            data: faqs,
        });
    }),

    // ==================== GET ALL (Admin) ====================
    getAllFaqs: catchAsync(async (_req: Request, res: Response) => {
        const faqs = await FaqService.getAllFaqs();

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'FAQs fetched successfully',
            data: faqs,
        });
    }),

    // ==================== GET BY ID (Admin) ====================
    getFaqById: catchAsync(async (req: Request, res: Response) => {
        const faq = await FaqService.getFaqById(req.params.id);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'FAQ fetched successfully',
            data: faq,
        });
    }),

    // ==================== CREATE (Admin) ====================
    createFaq: catchAsync(async (req: Request, res: Response) => {
        const faq = await FaqService.createFaq(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'FAQ created successfully',
            data: faq,
        });
    }),

    // ==================== UPDATE (Admin) ====================
    updateFaq: catchAsync(async (req: Request, res: Response) => {
        const faq = await FaqService.updateFaq(req.params.id, req.body);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'FAQ updated successfully',
            data: faq,
        });
    }),

    // ==================== TOGGLE ACTIVE (Admin) ====================
    toggleActive: catchAsync(async (req: Request, res: Response) => {
        const faq = await FaqService.toggleActive(req.params.id);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'FAQ status updated successfully',
            data: faq,
        });
    }),

    // ==================== DELETE (Admin) ====================
    deleteFaq: catchAsync(async (req: Request, res: Response) => {
        await FaqService.deleteFaq(req.params.id);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'FAQ deleted successfully',
        });
    }),
};

export default FaqController;
