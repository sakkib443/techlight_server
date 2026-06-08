// ===================================================================
// Techlight IT Institute LMS - Review Model
// MongoDB schema for student testimonials / site reviews
// ===================================================================

import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

const reviewSchema = new Schema<IReview, ReviewModel>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        name: { type: String, required: true, trim: true },
        avatar: { type: String, default: '' },
        designation: { type: String, trim: true, default: '' },
        course: { type: String, trim: true, default: '' },
        rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
        comment: { type: String, required: true, trim: true },
        status: {
            type: String,
            enum: ['approved', 'pending'],
            default: 'approved',
            index: true,
        },
    },
    { timestamps: true }
);

export const Review = model<IReview, ReviewModel>('Review', reviewSchema);
