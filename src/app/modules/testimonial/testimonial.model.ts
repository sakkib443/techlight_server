import { Schema, model } from 'mongoose';
import { ITestimonial } from './testimonial.interface';

const COLORS = ['#E31E27', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#14B8A6'];

const testimonialSchema = new Schema<ITestimonial>(
    {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        designation: { type: String, required: true, trim: true, maxlength: 150 },
        course: { type: String, required: true, trim: true, maxlength: 100 },
        review: { type: String, required: true, trim: true, maxlength: 1000 },
        rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
        userId: { type: String, default: null },
        userImage: { type: String, default: null },
        initial: { type: String, maxlength: 2 },
        color: { type: String, default: '#E31E27' },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Auto-set initial and color before save
testimonialSchema.pre('save', function (next) {
    if (!this.initial && this.name) {
        this.initial = this.name.charAt(0).toUpperCase();
    }
    if (!this.color) {
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    next();
});

export const Testimonial = model<ITestimonial>('Testimonial', testimonialSchema);
