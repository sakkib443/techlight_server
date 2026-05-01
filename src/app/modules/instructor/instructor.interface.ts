import { Types } from 'mongoose';

export interface IInstructor {
    name: string;
    designation: string;
    bio?: string;
    image?: string;
    email?: string;
    phone?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    specialization?: string[];
    isActive: boolean;
    isDeleted: boolean;
    user?: Types.ObjectId; // Optional link to a user account
}
