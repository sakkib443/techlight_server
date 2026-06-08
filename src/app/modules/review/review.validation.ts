import { z } from 'zod';

const createReviewSchema = z.object({
    body: z.object({
        rating: z.coerce.number().min(1, 'Rating must be between 1 and 5').max(5),
        comment: z.string().min(3, 'Review must be at least 3 characters long'),
        designation: z.string().optional(),
        course: z.string().optional(),
    }),
});

const updateStatusSchema = z.object({
    body: z.object({
        status: z.enum(['approved', 'pending']),
    }),
});

export const ReviewValidation = {
    createReviewSchema,
    updateStatusSchema,
};
