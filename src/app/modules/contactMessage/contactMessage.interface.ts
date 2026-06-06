import { Document } from 'mongoose';

export interface IContactMessage extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    ipAddress?: string;
    createdAt: Date;
    updatedAt: Date;
}
