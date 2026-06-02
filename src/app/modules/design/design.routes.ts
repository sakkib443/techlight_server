import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DesignValidation } from './design.validation';
import { DesignController } from './design.controller';
import { authMiddleware } from '../../middlewares/auth';
import { checkRole } from '../../middlewares/chackRole';

const router = express.Router();

// Public - fetch contact content
router.get('/contact', DesignController.getContactContent);

// Admin - update contact content
router.patch(
    '/contact',
    authMiddleware,
    checkRole('admin'),
    validateRequest(DesignValidation.updateContactSchema),
    DesignController.updateContactContent
);

export const DesignRoutes = router;
