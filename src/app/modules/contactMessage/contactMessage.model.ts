import { Schema, model } from 'mongoose';
import { IContactMessage } from './contactMessage.interface';

const contactMessageSchema = new Schema<IContactMessage>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
            maxlength: [200, 'Subject cannot exceed 200 characters'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            maxlength: [2000, 'Message cannot exceed 2000 characters'],
        },
        status: {
            type: String,
            enum: ['unread', 'read', 'replied'],
            default: 'unread',
        },
        ipAddress: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const ContactMessage = model<IContactMessage>('ContactMessage', contactMessageSchema);
