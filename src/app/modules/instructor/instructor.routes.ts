import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { InstructorValidation } from './instructor.validation';
import { InstructorController } from './instructor.controller';
import { authMiddleware } from '../../middlewares/auth';
import { checkRole } from '../../middlewares/chackRole';

const router = express.Router();

router.get('/', InstructorController.getAllInstructors);
router.get('/:id', InstructorController.getSingleInstructor);

router.post(
    '/',
    authMiddleware,
    checkRole('admin'),
    validateRequest(InstructorValidation.createInstructorSchema),
    InstructorController.createInstructor
);

router.patch(
    '/:id',
    authMiddleware,
    checkRole('admin'),
    validateRequest(InstructorValidation.updateInstructorSchema),
    InstructorController.updateInstructor
);

router.delete('/:id', authMiddleware, checkRole('admin'), InstructorController.deleteInstructor);

export const InstructorRoutes = router;
