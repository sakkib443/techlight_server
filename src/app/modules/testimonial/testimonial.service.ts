import { Testimonial } from './testimonial.model';
import { ITestimonial } from './testimonial.interface';

// Public: get all active testimonials
const getActiveTestimonials = async () => {
    return await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
};

// Admin: get all testimonials
const getAllTestimonials = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const total = await Testimonial.countDocuments();
    const data = await Testimonial.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};

// Anyone logged in: create
const createTestimonial = async (payload: Partial<ITestimonial>) => {
    return await Testimonial.create(payload);
};

// Admin: toggle active
const toggleActive = async (id: string) => {
    const t = await Testimonial.findById(id);
    if (!t) throw new Error('Not found');
    t.isActive = !t.isActive;
    await t.save();
    return t;
};

// Admin: delete
const deleteTestimonial = async (id: string) => {
    await Testimonial.findByIdAndDelete(id);
};

export const TestimonialService = {
    getActiveTestimonials,
    getAllTestimonials,
    createTestimonial,
    toggleActive,
    deleteTestimonial,
};
