// ===================================================================
// Techlight IT Institute Backend - FAQ Routes
// FAQ module এর API endpoints
// ===================================================================

import express from 'express';
import FaqController from './faq.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth';
import { createFaqValidation, updateFaqValidation } from './faq.validation';

const router = express.Router();

// ===================================================================
// PUBLIC ROUTE
// ===================================================================

// GET /api/faqs — public FAQ page এর জন্য active FAQ গুলো
router.get('/', FaqController.getActiveFaqs);

// ===================================================================
// ADMIN ROUTES (login + admin role required)
// ===================================================================

// GET /api/faqs/all — admin dashboard এ সব FAQ (active + inactive)
router.get('/all', authMiddleware, authorizeRoles('admin'), FaqController.getAllFaqs);

// GET /api/faqs/:id — single FAQ (edit form এ load করার জন্য)
router.get('/:id', authMiddleware, authorizeRoles('admin'), FaqController.getFaqById);

// POST /api/faqs — নতুন FAQ তৈরি
router.post(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    validateRequest(createFaqValidation),
    FaqController.createFaq
);

// PATCH /api/faqs/:id/toggle — active/inactive toggle (specific route আগে রাখা হয়েছে)
router.patch('/:id/toggle', authMiddleware, authorizeRoles('admin'), FaqController.toggleActive);

// PATCH /api/faqs/:id — FAQ update
router.patch(
    '/:id',
    authMiddleware,
    authorizeRoles('admin'),
    validateRequest(updateFaqValidation),
    FaqController.updateFaq
);

// DELETE /api/faqs/:id — FAQ delete
router.delete('/:id', authMiddleware, authorizeRoles('admin'), FaqController.deleteFaq);

export const FaqRoutes = router;
