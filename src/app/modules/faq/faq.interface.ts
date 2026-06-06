// ===================================================================
// Techlight IT Institute Backend - FAQ Interface
// FAQ module's TypeScript type definitions (English only)
// ===================================================================

import { Document } from 'mongoose';

// FAQ categories (matches the public FAQ page tabs)
export type TFaqCategory =
    | 'enrollment'
    | 'payment'
    | 'certificate'
    | 'course'
    | 'technical';

export interface IFaq extends Document {
    question: string;
    answer: string;
    category: TFaqCategory;
    order: number;      // for sorting (smaller shows first)
    isActive: boolean;  // whether it shows on the public page
    createdAt: Date;
    updatedAt: Date;
}
