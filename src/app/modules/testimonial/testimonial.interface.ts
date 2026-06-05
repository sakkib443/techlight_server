import { Document } from 'mongoose';

export interface ITestimonial extends Document {
    name: string;
    designation: string;
    course: string;
    review: string;
    rating: number;
    userId?: string;
    userImage?: string;
    initial: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
