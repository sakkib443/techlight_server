import express from 'express';
import { TestimonialController } from './testimonial.controller';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth';
import { uploadTestimonialImage } from '../../utils/cloudinary';

const router = express.Router();

// Public — homepage দেখানোর জন্য
router.get('/', TestimonialController.getActive);

// Admin — সব দেখা
router.get('/all', authMiddleware, authorizeRoles('admin'), TestimonialController.getAll);

// Public — anyone can submit a testimonial (optional image upload)
router.post('/', (req, res, next) => {
    uploadTestimonialImage(req, res, (err) => {
        if (err) return next(err);
        next();
    });
}, TestimonialController.create);

// Admin only
router.patch('/:id/toggle', authMiddleware, authorizeRoles('admin'), TestimonialController.toggleActive);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), TestimonialController.remove);

export const TestimonialRoutes = router;
