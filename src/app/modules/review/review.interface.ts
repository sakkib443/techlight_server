// ===================================================================
// Techlight IT Institute LMS - Review (Student Testimonials) Interface
// ===================================================================

import { Model, Types } from 'mongoose';

export type TReviewStatus = 'approved' | 'pending';

export interface IReview {
    _id?: Types.ObjectId;
    user: Types.ObjectId;       // reviewer (ref User)
    name: string;               // snapshot of reviewer name
    avatar?: string;            // snapshot of avatar
    designation?: string;       // e.g. "Frontend Developer, Technova"
    course?: string;            // optional course/tag label
    rating: number;             // 1 - 5
    comment: string;            // the review text
    status: TReviewStatus;      // 'approved' shows on website
    createdAt?: Date;
    updatedAt?: Date;
}

export type ReviewModel = Model<IReview>;
