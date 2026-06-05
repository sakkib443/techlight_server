// ===================================================================
// Techlight IT Institute LMS - Certificate Routes
// API routes for the standalone certificate.
// ===================================================================

import express from 'express';
import { CertificateController } from './certificate.controller';
import { CertificateValidation } from './certificate.validation';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// ==================== Public Routes ====================
// Search certificates by phone / email / studentId
router.get('/search', CertificateController.searchCertificates);

// Verify a certificate by its number
router.get('/verify/:number', CertificateController.verifyCertificate);

// ==================== Student Route ====================
// Get logged-in student's certificates (matched by email)
router.get('/my', authMiddleware, CertificateController.getMyCertificates);

// ==================== Admin Routes ====================
router.post(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    validateRequest(CertificateValidation.issueCertificateSchema),
    CertificateController.issueCertificate
);

router.get(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    CertificateController.getAllCertificates
);

router.patch(
    '/:id',
    authMiddleware,
    authorizeRoles('admin'),
    validateRequest(CertificateValidation.updateCertificateSchema),
    CertificateController.updateCertificate
);

router.delete(
    '/:id',
    authMiddleware,
    authorizeRoles('admin'),
    CertificateController.deleteCertificate
);

// ==================== Authenticated Route ====================
// Get a single certificate by ID (kept last to avoid path conflicts)
router.get('/:id', authMiddleware, CertificateController.getCertificateById);

export const CertificateRoutes = router;
