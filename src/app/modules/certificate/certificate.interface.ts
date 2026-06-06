// ===================================================================
// Techlight IT Institute LMS - Certificate Interface
// Standalone certificate — issued by admin from typed info + a batch.
// No dependency on registered users / courses / enrollments.
// ===================================================================

import { Model, Types } from 'mongoose';

export type TCertificateStatus = 'issued' | 'revoked';

/**
 * ICertificate - Standalone certificate
 * Admin types the student info and (optionally) links a CertificateBatch
 * whose common fields (mentor, dates, batch no.) are snapshotted in.
 */
export interface ICertificate {
    _id?: Types.ObjectId;

    // ==================== Identity ====================
    certificateNumber: string;            // Unique, auto e.g. "TII-2026-0001"

    // ==================== Student info (typed) ====================
    studentName: string;
    phone: string;                        // searchable
    email?: string;                       // searchable
    studentId: string;                    // academy ID, searchable e.g. "TECH-2024-001"

    // ==================== Course / result ====================
    courseName?: string;                  // program name (may come from batch)
    grade?: string;

    // ==================== Batch (optional link + snapshot) ====================
    certificateBatch?: Types.ObjectId;    // CertificateBatch reference
    batchNumber?: string;                 // snapshot
    batchName?: string;                   // snapshot
    mentorName?: string;                  // snapshot
    startDate?: Date;                     // snapshot
    endDate?: Date;                       // snapshot

    // ==================== Issuance ====================
    issuedBy?: Types.ObjectId;            // Admin who issued it
    issueDate: Date;
    status: TCertificateStatus;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICertificateFilters {
    status?: TCertificateStatus;
    certificateBatch?: string;
    searchTerm?: string;
}

/**
 * Public search payload (phone OR email OR studentId).
 */
export interface ICertificateSearch {
    phone?: string;
    email?: string;
    studentId?: string;
}

export type CertificateModel = Model<ICertificate>;
