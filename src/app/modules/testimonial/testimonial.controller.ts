import { Request, Response, NextFunction } from 'express';
import { TestimonialService } from './testimonial.service';

// GET /api/testimonials — public
const getActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await TestimonialService.getActiveTestimonials();
        res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
};

// GET /api/testimonials/all — admin
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const result = await TestimonialService.getAllTestimonials(page, limit);
        res.status(200).json({ success: true, data: result.data, meta: result.meta });
    } catch (error) { next(error); }
};

// POST /api/testimonials — logged in user
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const payload = { ...req.body, userId };
        const testimonial = await TestimonialService.createTestimonial(payload);
        res.status(201).json({ success: true, message: 'Testimonial added successfully', data: testimonial });
    } catch (error) { next(error); }
};

// PATCH /api/testimonials/:id/toggle — admin
const toggleActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await TestimonialService.toggleActive(req.params.id);
        res.status(200).json({ success: true, message: 'Status updated', data });
    } catch (error) { next(error); }
};

// DELETE /api/testimonials/:id — admin
const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await TestimonialService.deleteTestimonial(req.params.id);
        res.status(200).json({ success: true, message: 'Testimonial deleted' });
    } catch (error) { next(error); }
};

export const TestimonialController = { getActive, getAll, create, toggleActive, remove };
