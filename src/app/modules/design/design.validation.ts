import { z } from 'zod';

const updateContactSchema = z.object({
    body: z.object({
        contactContent: z.record(z.string(), z.any()).optional(),
    }),
});

const updateHomeSchema = z.object({
    body: z.object({
        homeContent: z.record(z.string(), z.any()).optional(),
    }),
});

export const DesignValidation = {
    updateContactSchema,
    updateHomeSchema,
};
