// ===================================================================
// Techlight IT Institute Backend - FAQ Service
// FAQ CRUD এর business logic
// ===================================================================

import AppError from '../../utils/AppError';
import { IFaq } from './faq.interface';
import { Faq } from './faq.model';
import { TCreateFaqInput, TUpdateFaqInput } from './faq.validation';

const FaqService = {
    // ==================== GET ACTIVE FAQs (Public) ====================
    // Public FAQ page এর জন্য — শুধু active গুলো, order অনুযায়ী sorted
    async getActiveFaqs(category?: string): Promise<IFaq[]> {
        const query: Record<string, unknown> = { isActive: true };
        if (category && category !== 'all') {
            query.category = category;
        }
        return await Faq.find(query).sort({ order: 1, createdAt: 1 });
    },

    // ==================== GET ALL FAQs (Admin) ====================
    // Admin dashboard এর জন্য — active/inactive সব
    async getAllFaqs(): Promise<IFaq[]> {
        return await Faq.find().sort({ order: 1, createdAt: 1 });
    },

    // ==================== GET SINGLE FAQ ====================
    async getFaqById(id: string): Promise<IFaq> {
        const faq = await Faq.findById(id);
        if (!faq) {
            throw new AppError(404, 'FAQ not found');
        }
        return faq;
    },

    // ==================== CREATE FAQ (Admin) ====================
    async createFaq(payload: TCreateFaqInput): Promise<IFaq> {
        return await Faq.create(payload);
    },

    // ==================== UPDATE FAQ (Admin) ====================
    async updateFaq(id: string, payload: TUpdateFaqInput): Promise<IFaq> {
        const faq = await Faq.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true, runValidators: true }
        );
        if (!faq) {
            throw new AppError(404, 'FAQ not found');
        }
        return faq;
    },

    // ==================== TOGGLE ACTIVE (Admin) ====================
    async toggleActive(id: string): Promise<IFaq> {
        const faq = await Faq.findById(id);
        if (!faq) {
            throw new AppError(404, 'FAQ not found');
        }
        faq.isActive = !faq.isActive;
        await faq.save();
        return faq;
    },

    // ==================== DELETE FAQ (Admin) ====================
    async deleteFaq(id: string): Promise<void> {
        const faq = await Faq.findByIdAndDelete(id);
        if (!faq) {
            throw new AppError(404, 'FAQ not found');
        }
    },
};

export default FaqService;
