// ===================================================================
// Techlight IT Institute LMS - Certificate Validation
// Zod validation schemas for the standalone certificate.
// ===================================================================

import { z } from 'zod';

const issueCertificateSchema = z.object({
    body: z.object({
        studentName: z.string({ required_error: 'Student name is required' }).min(1, 'Student name is required'),
        phone: z.string({ required_error: 'Phone number is required' }).min(1, 'Phone number is required'),
        email: z.string().email('Invalid email').optional().or(z.literal('')),
        studentId: z.string({ required_error: 'Student ID is required' }).min(1, 'Student ID is required'),
        courseName: z.string().optional(),
        grade: z.string().optional(),
        certificateBatch: z.string().optional(),
        // The following may be sent directly when no batch is linked
        batchNumber: z.string().optional(),
        batchName: z.string().optional(),
        mentorName: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        issueDate: z.string().optional(),
    }),
});

const updateCertificateSchema = z.object({
    body: z.object({
        studentName: z.string().min(1).optional(),
        phone: z.string().min(1).optional(),
        email: z.string().email('Invalid email').optional().or(z.literal('')),
        studentId: z.string().min(1).optional(),
        courseName: z.string().optional(),
        grade: z.string().optional(),
        certificateBatch: z.string().optional(),
        batchNumber: z.string().optional(),
        batchName: z.string().optional(),
        mentorName: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        issueDate: z.string().optional(),
        status: z.enum(['issued', 'revoked']).optional(),
    }),
});

export const CertificateValidation = {
    issueCertificateSchema,
    updateCertificateSchema,
};
