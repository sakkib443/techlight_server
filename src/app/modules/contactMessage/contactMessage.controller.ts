import { Request, Response, NextFunction } from 'express';
import { ContactMessageService } from './contactMessage.service';

// POST /api/contact — public
const submitMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ip = req.ip || req.socket?.remoteAddress;
        const message = await ContactMessageService.createMessage(req.body, ip);

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: message,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/contact — admin only
const getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const status = req.query.status as string | undefined;

        const result = await ContactMessageService.getAllMessages(page, limit, status);

        res.status(200).json({
            success: true,
            message: 'Messages retrieved successfully',
            data: result.data,
            meta: result.meta,
        });
    } catch (error) {
        next(error);
    }
};

// PATCH /api/contact/:id/status — admin only
const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await ContactMessageService.updateStatus(id, status);

        res.status(200).json({
            success: true,
            message: 'Status updated',
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/contact/:id — admin only
const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await ContactMessageService.deleteMessage(id);

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/contact/unread-count — admin only
const getUnreadCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await ContactMessageService.getUnreadCount();
        res.status(200).json({ success: true, data: { count } });
    } catch (error) {
        next(error);
    }
};

export const ContactMessageController = {
    submitMessage,
    getAllMessages,
    updateStatus,
    deleteMessage,
    getUnreadCount,
};
