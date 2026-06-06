import { ContactMessage } from './contactMessage.model';
import { IContactMessage } from './contactMessage.interface';

// Submit a new contact message
const createMessage = async (payload: Partial<IContactMessage>, ipAddress?: string) => {
    const message = await ContactMessage.create({ ...payload, ipAddress });
    return message;
};

// Get all messages (admin only) with pagination
const getAllMessages = async (page = 1, limit = 20, status?: string) => {
    const filter: any = {};
    if (status && status !== 'all') filter.status = status;

    const skip = (page - 1) * limit;
    const total = await ContactMessage.countDocuments(filter);

    const messages = await ContactMessage.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return {
        data: messages,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

// Mark as read
const updateStatus = async (id: string, status: 'unread' | 'read' | 'replied') => {
    const message = await ContactMessage.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
    return message;
};

// Delete a message
const deleteMessage = async (id: string) => {
    await ContactMessage.findByIdAndDelete(id);
};

// Unread count
const getUnreadCount = async () => {
    return await ContactMessage.countDocuments({ status: 'unread' });
};

export const ContactMessageService = {
    createMessage,
    getAllMessages,
    updateStatus,
    deleteMessage,
    getUnreadCount,
};
