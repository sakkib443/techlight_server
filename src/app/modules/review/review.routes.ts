import express from 'express';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// ==================== Public ====================
// Approved reviews shown on the website (home page testimonials)
router.get('/', ReviewController.getApprovedReviews);

// ==================== Authenticated ====================
// Any logged-in user can submit a review
router.post(
    '/',
    authMiddleware,
    validateRequest(ReviewValidation.createReviewSchema),
    ReviewController.createReview
);

// ==================== Admin ====================
// All reviews (with optional ?status=&page=&limit=)
router.get('/admin/all', authMiddleware, authorizeRoles('admin'), ReviewController.getAllReviews);

// Change a review's status (approved / pending)
router.patch(
    '/admin/:id/status',
    authMiddleware,
    authorizeRoles('admin'),
    validateRequest(ReviewValidation.updateStatusSchema),
    ReviewController.updateStatus
);

// Delete a review
router.delete('/:id', authMiddleware, authorizeRoles('admin'), ReviewController.deleteReview);

export const ReviewRoutes = router;
