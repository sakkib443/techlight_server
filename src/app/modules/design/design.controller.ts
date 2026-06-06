import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DesignService } from './design.service';

// ==================== Contact ====================
const getContactContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.getContactContent();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Contact content fetched successfully',
        data: result,
    });
});

const updateContactContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.updateContactContent(req.body.contactContent || {});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Contact content updated successfully',
        data: result,
    });
});

// ==================== Home: Hero ====================
const getHeroContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.getHeroContent();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Hero content fetched successfully',
        data: result,
    });
});

const updateHeroContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.updateHeroContent(req.body.heroContent || {});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Hero content updated successfully',
        data: result,
    });
});

// ==================== Home: What We Provide ====================
const getProvideContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.getProvideContent();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Provide content fetched successfully',
        data: result,
    });
});

const updateProvideContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.updateProvideContent(req.body.provideContent || {});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Provide content updated successfully',
        data: result,
    });
});

// ==================== About Page ====================
const getAboutContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.getAboutContent();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'About content fetched successfully',
        data: result,
    });
});

const updateAboutContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.updateAboutContent(req.body.aboutContent || {});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'About content updated successfully',
        data: result,
    });
});

// ==================== Payment ====================
const getPaymentContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.getPaymentContent();
    sendResponse(res, { statusCode: 200, success: true, message: 'Payment content fetched', data: result });
});

const updatePaymentContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.updatePaymentContent(req.body.paymentContent || {});
    sendResponse(res, { statusCode: 200, success: true, message: 'Payment content updated', data: result });
});

export const DesignController = {
    getContactContent,
    updateContactContent,
    getHeroContent,
    updateHeroContent,
    getProvideContent,
    updateProvideContent,
    getAboutContent,
    updateAboutContent,
    getPaymentContent,
    updatePaymentContent,
};
