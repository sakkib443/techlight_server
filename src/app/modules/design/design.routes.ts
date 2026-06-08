import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DesignValidation } from './design.validation';
import { DesignController } from './design.controller';
import { authMiddleware } from '../../middlewares/auth';
import { checkRole } from '../../middlewares/chackRole';

const router = express.Router();

// ==================== Contact ====================
router.get('/contact', DesignController.getContactContent);
router.patch(
    '/contact',
    authMiddleware,
    checkRole('admin'),
    validateRequest(DesignValidation.updateContactSchema),
    DesignController.updateContactContent
);

// ==================== Home: Hero ====================
router.get('/hero', DesignController.getHeroContent);
router.patch(
    '/hero',
    authMiddleware,
    checkRole('admin'),
    validateRequest(DesignValidation.updateHeroSchema),
    DesignController.updateHeroContent
);

// ==================== Home: What We Provide ====================
router.get('/provide', DesignController.getProvideContent);
router.patch(
    '/provide',
    authMiddleware,
    checkRole('admin'),
    validateRequest(DesignValidation.updateProvideSchema),
    DesignController.updateProvideContent
);

// ==================== About Page ====================
router.get('/about', DesignController.getAboutContent);
router.patch(
    '/about',
    authMiddleware,
    checkRole('admin'),
    validateRequest(DesignValidation.updateAboutSchema),
    DesignController.updateAboutContent
);

// ==================== SEO ====================
router.get('/seo', DesignController.getSeoContent);
router.patch(
    '/seo',
    authMiddleware,
    checkRole('admin'),
    validateRequest(DesignValidation.updateSeoSchema),
    DesignController.updateSeoContent
);

export const DesignRoutes = router;
