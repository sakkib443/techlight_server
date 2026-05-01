import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InstructorService } from './instructor.service';
import pick from '../../utils/pick';

const createInstructor = catchAsync(async (req: Request, res: Response) => {
    const result = await InstructorService.createInstructor(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Instructor created successfully',
        data: result,
    });
});

const getAllInstructors = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'isActive']);
    const result = await InstructorService.getAllInstructors(filters);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Instructors fetched successfully',
        data: result,
    });
});

const getSingleInstructor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await InstructorService.getSingleInstructor(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Instructor fetched successfully',
        data: result,
    });
});

const updateInstructor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await InstructorService.updateInstructor(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Instructor updated successfully',
        data: result,
    });
});

const deleteInstructor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await InstructorService.deleteInstructor(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Instructor deleted successfully',
        data: result,
    });
});

export const InstructorController = {
    createInstructor,
    getAllInstructors,
    getSingleInstructor,
    updateInstructor,
    deleteInstructor,
};
