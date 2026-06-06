import { Types } from 'mongoose';

export interface IInstructor {
    name: string;
    designation?: string;
    subject?: string;
    bio?: string;
    details?: string;
    lifeJourney?: string;
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
    education?: string[];
    workExperience?: string[];
    trainingExperience?: {
        years?: string;
        students?: string;
    };
    isActive: boolean;
    isDeleted: boolean;
    user?: Types.ObjectId; // Optional link to a user account
}
