import { z } from 'zod';

const createInstructorSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Instructor name is required' }).min(2, 'Name must be at least 2 characters'),
        designation: z.string().optional().or(z.literal('')),
        bio: z.string().optional().or(z.literal('')),
        image: z.string().optional().or(z.literal('')),
        email: z.string().optional().or(z.literal('')),
        phone: z.string().optional().or(z.literal('')),
        socialLinks: z.object({
            facebook: z.string().optional().or(z.literal('')),
            twitter: z.string().optional().or(z.literal('')),
            linkedin: z.string().optional().or(z.literal('')),
            github: z.string().optional().or(z.literal('')),
        }).optional(),
        specialization: z.union([z.array(z.string()), z.string()]).optional(),
        isActive: z.boolean().optional(),
        user: z.string().optional().nullable(),
    }),
});

const updateInstructorSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        designation: z.string().optional().or(z.literal('')),
        bio: z.string().optional().or(z.literal('')),
        image: z.string().optional().or(z.literal('')),
        email: z.string().optional().or(z.literal('')),
        phone: z.string().optional().or(z.literal('')),
        socialLinks: z.object({
            facebook: z.string().optional().or(z.literal('')),
            twitter: z.string().optional().or(z.literal('')),
            linkedin: z.string().optional().or(z.literal('')),
            github: z.string().optional().or(z.literal('')),
        }).optional(),
        specialization: z.union([z.array(z.string()), z.string()]).optional(),
        isActive: z.boolean().optional(),
        user: z.string().optional().nullable(),
    }),
});

export const InstructorValidation = {
    createInstructorSchema,
    updateInstructorSchema,
};
