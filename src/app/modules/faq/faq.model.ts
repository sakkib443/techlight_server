// ===================================================================
// Techlight IT Institute Backend - FAQ Model
// FAQ Mongoose schema & model (English only)
// ===================================================================

import { Schema, model } from 'mongoose';
import { IFaq } from './faq.interface';

// Matches the public FAQ page category tabs
export const FAQ_CATEGORIES = [
    'enrollment',
    'payment',
    'certificate',
    'course',
    'technical',
] as const;

const faqSchema = new Schema<IFaq>(
    {
        question: { type: String, required: true, trim: true, maxlength: 500 },
        answer: { type: String, required: true, trim: true, maxlength: 3000 },
        category: {
            type: String,
            enum: FAQ_CATEGORIES,
            required: true,
            default: 'enrollment',
        },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Indexes for faster sorting/filtering
faqSchema.index({ isActive: 1, order: 1 });
faqSchema.index({ category: 1 });

export const Faq = model<IFaq>('Faq', faqSchema);
