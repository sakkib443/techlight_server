// ===================================================================
// Techlight IT Institute LMS - Certificate Batch Routes
// Admin-only CRUD for the certificate-only batch.
// ===================================================================

import express from 'express';
import { CertificateBatchController } from './certificateBatch.controller';
import { CertificateBatchValidation } from './certificateBatch.validation';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    validateRequest(CertificateBatchValidation.createBatchSchema),
    CertificateBatchController.createBatch
);

router.get(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    CertificateBatchController.getAllBatches
);

router.get(
    '/:id',
    authMiddleware,
    authorizeRoles('admin'),
    CertificateBatchController.getBatchById
);

router.patch(
    '/:id',
    authMiddleware,
    authorizeRoles('admin'),
    validateRequest(CertificateBatchValidation.updateBatchSchema),
    CertificateBatchController.updateBatch
);

router.delete(
    '/:id',
    authMiddleware,
    authorizeRoles('admin'),
    CertificateBatchController.deleteBatch
);

export const CertificateBatchRoutes = router;
