import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DesignService } from './design.service';

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
    const { contactContent } = req.body;
    const result = await DesignService.updateContactContent(contactContent || {});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Contact content updated successfully',
        data: result,
    });
});

const getHomeContent = catchAsync(async (req: Request, res: Response) => {
    const result = await DesignService.getHomeContent();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Home content fetched successfully',
        data: result,
    });
});

const updateHomeContent = catchAsync(async (req: Request, res: Response) => {
    const { homeContent } = req.body;
    const result = await DesignService.updateHomeContent(homeContent || {});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Home content updated successfully',
        data: result,
    });
});

export const DesignController = {
    getContactContent,
    updateContactContent,
    getHomeContent,
    updateHomeContent,
};
