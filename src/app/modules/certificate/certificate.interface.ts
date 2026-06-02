// ===================================================================
// Techlight IT Institute LMS - Certificate Interface
// Certificate module TypeScript interface definitions
// সার্টিফিকেট মডিউলের TypeScript interface definitions
// ===================================================================

import { Model, Types } from 'mongoose';

/**
 * Certificate Status Types
 */
export type TCertificateStatus = 'issued' | 'revoked';

/**
 * ICertificate - Main Certificate Interface
 * Student কে issue করা certificate data
 */
export interface ICertificate {
    _id?: Types.ObjectId;

    // ==================== Identity ====================
    certificateNumber: string;        // Unique, e.g. "TII-2026-0001"

    // ==================== Core References ====================
    student: Types.ObjectId;          // User (student) reference
    course: Types.ObjectId;           // Course reference
    enrollment?: Types.ObjectId;      // Enrollment reference (source)
    batch?: Types.ObjectId;           // Batch reference (optional)

    // ==================== Certificate Info ====================
    title: string;                    // Certificate title (default = course title)
    studentName: string;              // Snapshot of student name (integrity)
    courseName: string;               // Snapshot of course name (integrity)
    grade?: string;                   // Optional grade / result

    // ==================== Issuance ====================
    issuedBy?: Types.ObjectId;        // Admin who issued it
    issueDate: Date;                  // When it was issued
    status: TCertificateStatus;       // issued | revoked
    fileUrl?: string;                 // Optional stored file URL (manual upload path)

    // ==================== Timestamps ====================
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * ICertificateFilters - Query Filters
 */
export interface ICertificateFilters {
    student?: string;
    course?: string;
    batch?: string;
    status?: TCertificateStatus;
    searchTerm?: string;
}

/**
 * CertificateModel - Mongoose Model Type
 */
export type CertificateModel = Model<ICertificate>;
