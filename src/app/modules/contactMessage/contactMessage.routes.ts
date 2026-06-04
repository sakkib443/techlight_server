import express from 'express';
import { ContactMessageController } from './contactMessage.controller';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth';

const router = express.Router();

// Public — form submit
router.post('/', ContactMessageController.submitMessage);

// Admin only
router.get('/', authMiddleware, authorizeRoles('admin'), ContactMessageController.getAllMessages);
router.get('/unread-count', authMiddleware, authorizeRoles('admin'), ContactMessageController.getUnreadCount);
router.patch('/:id/status', authMiddleware, authorizeRoles('admin'), ContactMessageController.updateStatus);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), ContactMessageController.deleteMessage);

export const ContactMessageRoutes = router;
