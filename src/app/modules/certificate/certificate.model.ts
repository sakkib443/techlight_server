// ===================================================================
// Techlight IT Institute LMS - Certificate Model
// MongoDB Certificate Schema with Mongoose
// সার্টিফিকেট কালেকশনের Mongoose স্কিমা
// ===================================================================

import { Schema, model } from 'mongoose';
import { ICertificate, CertificateModel } from './certificate.interface';

/**
 * Certificate Schema Definition
 */
const certificateSchema = new Schema<ICertificate, CertificateModel>(
    {
        // ==================== Identity ====================
        certificateNumber: {
            type: String,
            required: [true, 'Certificate number is required'],
            unique: true,
            uppercase: true,
            trim: true,
            index: true,
        },

        // ==================== Core References ====================
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Student reference is required'],
            index: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Course reference is required'],
            index: true,
        },
        enrollment: {
            type: Schema.Types.ObjectId,
            ref: 'Enrollment',
        },
        batch: {
            type: Schema.Types.ObjectId,
            ref: 'Batch',
        },

        // ==================== Certificate Info ====================
        title: {
            type: String,
            required: [true, 'Certificate title is required'],
            trim: true,
        },
        studentName: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true,
        },
        courseName: {
            type: String,
            required: [true, 'Course name is required'],
            trim: true,
        },
        grade: {
            type: String,
            trim: true,
            default: '',
        },

        // ==================== Issuance ====================
        issuedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        issueDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: {
                values: ['issued', 'revoked'],
                message: '{VALUE} is not a valid status',
            },
            default: 'issued',
        },
        fileUrl: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.__v;
                return ret;
            },
        },
    }
);

// ==================== Indexes ====================
// One certificate per student per course
certificateSchema.index({ student: 1, course: 1 }, { unique: true });
certificateSchema.index({ issueDate: -1 });

// ==================== Export Model ====================
export const Certificate = model<ICertificate, CertificateModel>('Certificate', certificateSchema);
