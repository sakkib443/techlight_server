// ===================================================================
// MotionBoss LMS - Enrollment Controller
// HTTP request handlers for Enrollment module
// এনরোলমেন্ট মডিউলের HTTP রিকোয়েস্ট হ্যান্ডলার
// ===================================================================

import { Request, Response, NextFunction } from 'express';
import { EnrollmentService } from './enrollment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

/**
 * Enroll in a course
 */
const enrollInCourse = catchAsync(async (req: Request, res: Response) => {
    const studentId = req.user!.userId;
    const { courseId, orderId } = req.body;

    const enrollment = await EnrollmentService.enrollStudent(studentId, courseId, orderId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Successfully enrolled in the course',
        data: enrollment,
    });
});

/**
 * Get my enrollments
 * GET /api/enrollments/my
 */
const getMyEnrollments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user!.userId;
        const { status } = req.query;

        const enrollments = await EnrollmentService.getStudentEnrollments(
            studentId,
            status as string
        );

        res.status(200).json({
            success: true,
            message: 'Enrollments retrieved successfully',
            data: enrollments,
            meta: {
                total: enrollments.length,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get my statistics
 * GET /api/enrollments/my/stats
 */
const getMyStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user!.userId;
        const stats = await EnrollmentService.getStudentStats(studentId);

        res.status(200).json({
            success: true,
            message: 'Statistics retrieved successfully',
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get enrollment for a specific course
 * GET /api/enrollments/course/:courseId
 */
const getMyCourseEnrollment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user!.userId;
        const { courseId } = req.params;

        const enrollment = await EnrollmentService.getStudentCourseEnrollment(studentId, courseId);

        res.status(200).json({
            success: true,
            message: 'Enrollment retrieved successfully',
            data: enrollment,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Check enrollment status
 * GET /api/enrollments/check/:courseId
 */
const checkEnrollment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user!.userId;
        const { courseId } = req.params;

        const isEnrolled = await EnrollmentService.isEnrolled(studentId, courseId);

        res.status(200).json({
            success: true,
            data: {
                isEnrolled,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update progress (mark lesson as complete)
 * POST /api/enrollments/progress
 */
const updateProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user!.userId;
        const { courseId, lessonId } = req.body;

        const enrollment = await EnrollmentService.updateProgress(studentId, courseId, lessonId);

        res.status(200).json({
            success: true,
            message: 'Progress updated successfully',
            data: enrollment,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update last accessed lesson
 * PATCH /api/enrollments/last-accessed
 */
const updateLastAccessed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user!.userId;
        const { courseId, lessonId } = req.body;

        await EnrollmentService.updateLastAccessed(studentId, courseId, lessonId);

        res.status(200).json({
            success: true,
            message: 'Last accessed updated',
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Admin Routes ====================

/**
 * Admin: Enroll a student
 */
const adminEnrollStudent = catchAsync(async (req: Request, res: Response) => {
    const { studentId, courseId } = req.body;
    const enrollment = await EnrollmentService.enrollStudent(studentId, courseId);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Student enrolled successfully',
        data: enrollment,
    });
});

/**
 * Admin: Get course enrollments
 */
const getCourseEnrollments = catchAsync(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { page, limit } = req.query;
    const result = await EnrollmentService.getCourseEnrollments(courseId, {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20,
    });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course enrollments retrieved',
        data: result.data,
        meta: result.meta,
    });
});

/**
 * Admin: Cancel enrollment
 */
const cancelEnrollment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reason } = req.body;
    const enrollment = await EnrollmentService.cancelEnrollment(id, reason);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Enrollment cancelled',
        data: enrollment,
    });
});

/**
 * Admin: Mark as completed
 */
const markAsCompleted = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const enrollment = await EnrollmentService.markAsCompleted(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Enrollment marked as completed',
        data: enrollment,
    });
});

/**
 * Admin: Get all enrollments
 */
const getAllEnrollments = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, status, courseId, studentId } = req.query;
    const p = Number(page) || 1;
    const l = Number(limit) || 20;

    const result = await EnrollmentService.getAllEnrollments(
        { status, courseId, studentId },
        { page: p, limit: l }
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Enrollments retrieved successfully',
        data: result.data,
        meta: {
            total: result.total,
            page: p,
            limit: l,
            totalPages: Math.ceil(result.total / l)
        }
    });
});

/**
 * Admin: Update enrollment
 */
const updateEnrollment = catchAsync(async (req: Request, res: Response) => {
    const enrollment = await EnrollmentService.updateEnrollment(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Enrollment updated successfully',
        data: enrollment,
    });
});

/**
 * Get enrollment by ID
 * GET /api/enrollments/:id
 */
const getEnrollmentById = catchAsync(async (req: Request, res: Response) => {
    const enrollment = await EnrollmentService.getEnrollmentById(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Enrollment retrieved successfully',
        data: enrollment
    });
});

export const EnrollmentController = {
    enrollInCourse,
    getMyEnrollments,
    getMyStats,
    getMyCourseEnrollment,
    checkEnrollment,
    updateProgress,
    updateLastAccessed,
    adminEnrollStudent,
    getCourseEnrollments,
    getAllEnrollments,
    updateEnrollment,
    cancelEnrollment,
    markAsCompleted,
    getEnrollmentById,
};
