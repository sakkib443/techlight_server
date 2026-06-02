import { z } from 'zod';

const updateContactSchema = z.object({
    body: z.object({
        contactContent: z.record(z.string(), z.any()).optional(),
    }),
});

export const DesignValidation = {
    updateContactSchema,
};
