// ===================================================================
// Techlight IT Institute LMS - Certificate Batch Validation
// Zod validation schemas for the certificate-only batch.
// ===================================================================

import { z } from 'zod';

const createBatchSchema = z.object({
    body: z.object({
        batchNumber: z.string({ required_error: 'Batch number is required' }).min(1, 'Batch number is required'),
        batchName: z.string({ required_error: 'Batch name is required' }).min(1, 'Batch name is required'),
        courseName: z.string().optional(),
        mentorName: z.string({ required_error: 'Mentor name is required' }).min(1, 'Mentor name is required'),
        startDate: z.string({ required_error: 'Start date is required' }).min(1, 'Start date is required'),
        endDate: z.string({ required_error: 'End date is required' }).min(1, 'End date is required'),
        isActive: z.boolean().optional(),
    }),
});

const updateBatchSchema = z.object({
    body: z.object({
        batchNumber: z.string().min(1).optional(),
        batchName: z.string().min(1).optional(),
        courseName: z.string().optional(),
        mentorName: z.string().min(1).optional(),
        startDate: z.string().min(1).optional(),
        endDate: z.string().min(1).optional(),
        isActive: z.boolean().optional(),
    }),
});

export const CertificateBatchValidation = {
    createBatchSchema,
    updateBatchSchema,
};
