import express from 'express';
import { TestimonialController } from './testimonial.controller';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth';

const router = express.Router();

// Public — homepage দেখানোর জন্য
router.get('/', TestimonialController.getActive);

// Admin — সব দেখা
router.get('/all', authMiddleware, authorizeRoles('admin'), TestimonialController.getAll);

// Logged-in user — testimonial submit
router.post('/', authMiddleware, TestimonialController.create);

// Admin only
router.patch('/:id/toggle', authMiddleware, authorizeRoles('admin'), TestimonialController.toggleActive);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), TestimonialController.remove);

export const TestimonialRoutes = router;
