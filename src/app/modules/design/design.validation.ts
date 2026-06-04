import { z } from 'zod';

const updateContactSchema = z.object({
    body: z.object({
        contactContent: z.record(z.string(), z.any()).optional(),
    }),
});

const updateHeroSchema = z.object({
    body: z.object({
        heroContent: z.record(z.string(), z.any()).optional(),
    }),
});

const updateProvideSchema = z.object({
    body: z.object({
        provideContent: z.record(z.string(), z.any()).optional(),
    }),
});

export const DesignValidation = {
    updateContactSchema,
    updateHeroSchema,
    updateProvideSchema,
};
