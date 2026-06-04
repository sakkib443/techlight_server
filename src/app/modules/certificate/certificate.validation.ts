// ===================================================================
// Techlight IT Institute LMS - Certificate Validation
// Zod validation schemas for Certificate
// সার্টিফিকেট ভ্যালিডেশন স্কিমা
// ===================================================================

import { z } from 'zod';

const issueCertificateSchema = z.object({
    body: z
        .object({
            enrollmentId: z.string().optional(),
            studentId: z.string().optional(),
            courseId: z.string().optional(),
            batchId: z.string().optional(),
            title: z.string().optional(),
            grade: z.string().optional(),
            issueDate: z.string().optional(),
        })
        .refine((data) => !!data.enrollmentId || (!!data.studentId && !!data.courseId), {
            message: 'Provide either enrollmentId, or both studentId and courseId',
        }),
});

const updateCertificateSchema = z.object({
    body: z.object({
        title: z.string().min(1).optional(),
        grade: z.string().optional(),
        status: z.enum(['issued', 'revoked']).optional(),
        fileUrl: z.string().optional(),
    }),
});

export const CertificateValidation = {
    issueCertificateSchema,
    updateCertificateSchema,
};
