// ===================================================================
// Techlight IT Institute LMS - Certificate Batch Interface
// Lightweight batch used ONLY for certificate issuance.
// সার্টিফিকেট ইস্যুর জন্য হালকা ব্যাচ (course/enrollment এর সাথে যুক্ত নয়)
// ===================================================================

import { Model, Types } from 'mongoose';

/**
 * ICertificateBatch - Certificate-only batch
 * One batch groups the common info shared by many students:
 * batch number/name, mentor, start & end dates, program name.
 */
export interface ICertificateBatch {
    _id?: Types.ObjectId;

    batchNumber: string;   // "B-08"
    batchName: string;     // "MERN Stack - Batch 08"
    courseName?: string;   // Program / course name (optional)
    mentorName: string;    // Mentor for this batch

    startDate: Date;       // Batch start date
    endDate: Date;         // Batch end date

    isActive: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICertificateBatchFilters {
    isActive?: boolean;
    searchTerm?: string;
}

export type CertificateBatchModel = Model<ICertificateBatch>;
