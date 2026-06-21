// ===================================================================
// Techlight IT Institute LMS - Certificate Model
// Standalone certificate schema (typed student info + batch snapshot).
// ===================================================================

import { Schema, model } from 'mongoose';
import { ICertificate, CertificateModel } from './certificate.interface';

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

        // ==================== Student info ====================
        studentName: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            index: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: '',
            index: true,
        },
        studentId: {
            type: String,
            required: [true, 'Student ID is required'],
            trim: true,
            index: true,
        },

        // ==================== Course / result ====================
        courseName: {
            type: String,
            trim: true,
            default: '',
        },
        grade: {
            type: String,
            trim: true,
            default: '',
        },

        // ==================== Batch (link + snapshot) ====================
        certificateBatch: {
            type: Schema.Types.ObjectId,
            ref: 'CertificateBatch',
        },
        batchNumber: { type: String, trim: true, default: '' },
        batchName: { type: String, trim: true, default: '' },
        mentorName: { type: String, trim: true, default: '' },
        startDate: { type: Date },
        endDate: { type: Date },
        durationHours: { type: Number },

        // ==================== Signature ====================
        signatureName: { type: String, trim: true, default: '' },
        signatureDesignation: { type: String, trim: true, default: '' },

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
certificateSchema.index({ issueDate: -1 });
certificateSchema.index({ studentName: 'text', studentId: 'text', phone: 'text' });

export const Certificate = model<ICertificate, CertificateModel>('Certificate', certificateSchema);
