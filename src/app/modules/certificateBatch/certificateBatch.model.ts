// ===================================================================
// Techlight IT Institute LMS - Certificate Batch Model
// MongoDB schema for the lightweight certificate-only batch.
// ===================================================================

import { Schema, model } from 'mongoose';
import { ICertificateBatch, CertificateBatchModel } from './certificateBatch.interface';

const certificateBatchSchema = new Schema<ICertificateBatch, CertificateBatchModel>(
    {
        batchNumber: {
            type: String,
            required: [true, 'Batch number is required'],
            trim: true,
            index: true,
        },
        batchName: {
            type: String,
            required: [true, 'Batch name is required'],
            trim: true,
        },
        courseName: {
            type: String,
            trim: true,
            default: '',
        },
        mentorName: {
            type: String,
            required: [true, 'Mentor name is required'],
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
        },
        isActive: {
            type: Boolean,
            default: true,
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

certificateBatchSchema.index({ batchName: 'text', batchNumber: 'text', mentorName: 'text' });

export const CertificateBatch = model<ICertificateBatch, CertificateBatchModel>(
    'CertificateBatch',
    certificateBatchSchema
);
