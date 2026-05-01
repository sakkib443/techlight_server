// ===================================================================
// MotionBoss LMS - Live Class Validation
// Zod validation schemas for Live Class
// লাইভ ক্লাস ভ্যালিডেশন স্কিমা
// ===================================================================

import { z } from 'zod';

const resourceSchema = z.object({
    title: z.string().min(1, 'Resource title is required'),
    url: z.string().url('Invalid URL'),
    type: z.enum(['pdf', 'video', 'link', 'file']).optional(),
});

const createLiveClassSchema = z.object({
    body: z.object({
        batch: z.string({ required_error: 'Batch ID is required' }),
        instructor: z.string({ required_error: 'Instructor ID is required' }),
        title: z.string({ required_error: 'Class title is required' }).min(1),
        description: z.string().optional(),
        classNumber: z.number().min(1).optional(),
        classDate: z.string({ required_error: 'Class date is required' }),
        startTime: z.string({ required_error: 'Start time is required' }),
        endTime: z.string({ required_error: 'End time is required' }),
        duration: z.number().min(0).optional(),
        meetingLink: z.string({ required_error: 'Meeting link is required' }).url('Invalid meeting link'),
        meetingId: z.string().optional(),
        meetingPassword: z.string().optional(),
        platform: z.enum(['zoom', 'google_meet', 'microsoft_teams', 'custom']).optional(),
        resources: z.array(resourceSchema).optional(),
    }),
});

const updateLiveClassSchema = z.object({
    body: z.object({
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        classNumber: z.number().min(1).optional(),
        classDate: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        duration: z.number().min(0).optional(),
        meetingLink: z.string().url().optional(),
        meetingId: z.string().optional(),
        meetingPassword: z.string().optional(),
        platform: z.enum(['zoom', 'google_meet', 'microsoft_teams', 'custom']).optional(),
        status: z.enum(['scheduled', 'live', 'completed', 'cancelled']).optional(),
        recordingUrl: z.string().url().optional().nullable(),
        recordingDuration: z.number().min(0).optional(),
        resources: z.array(resourceSchema).optional(),
    }),
});

const updateStatusSchema = z.object({
    body: z.object({
        status: z.enum(['scheduled', 'live', 'completed', 'cancelled']),
    }),
});

const addAttendeeSchema = z.object({
    body: z.object({
        studentId: z.string({ required_error: 'Student ID is required' }),
    }),
});

export const LiveClassValidation = {
    createLiveClassSchema,
    updateLiveClassSchema,
    updateStatusSchema,
    addAttendeeSchema,
};
