import { Schema, model } from 'mongoose';
import { IInstructor } from './instructor.interface';

const instructorSchema = new Schema<IInstructor>(
    {
        name: { type: String, required: true },
        designation: { type: String },
        bio: { type: String },
        image: { type: String },
        email: { type: String },
        phone: { type: String },
        socialLinks: {
            facebook: { type: String },
            twitter: { type: String },
            linkedin: { type: String },
            github: { type: String },
        },
        specialization: [{ type: String }],
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

// Query Middleware - exclude deleted instructors
instructorSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

instructorSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Instructor = model<IInstructor>('Instructor', instructorSchema);
