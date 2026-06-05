// ===================================================================
// Techlight IT Institute Backend - FAQ Validation
// Zod schemas to validate FAQ create/update requests (English only)
// ===================================================================

import { z } from 'zod';

const categoryEnum = z.enum([
    'enrollment',
    'payment',
    'certificate',
    'course',
    'technical',
]);

/**
 * Create FAQ Validation
 */
export const createFaqValidation = z.object({
    body: z.object({
        question: z
            .string({ required_error: 'Question is required' })
            .min(1, 'Question is required')
            .max(500, 'Question cannot exceed 500 characters'),
        answer: z
            .string({ required_error: 'Answer is required' })
            .min(1, 'Answer is required')
            .max(3000, 'Answer cannot exceed 3000 characters'),
        category: categoryEnum,
        order: z.number().optional().default(0),
        isActive: z.boolean().optional().default(true),
    }),
});

/**
 * Update FAQ Validation (all fields optional)
 */
export const updateFaqValidation = z.object({
    body: z.object({
        question: z.string().min(1).max(500).optional(),
        answer: z.string().min(1).max(3000).optional(),
        category: categoryEnum.optional(),
        order: z.number().optional(),
        isActive: z.boolean().optional(),
    }),
    params: z.object({
        id: z.string({ required_error: 'FAQ ID is required' }),
    }),
});

export type TCreateFaqInput = z.infer<typeof createFaqValidation>['body'];
export type TUpdateFaqInput = z.infer<typeof updateFaqValidation>['body'];
