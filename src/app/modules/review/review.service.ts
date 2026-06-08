import { Review } from './review.model';
import { User } from '../user/user.model';
import AppError from '../../utils/AppError';

interface ICreateReviewPayload {
    rating: number;
    comment: string;
    designation?: string;
    course?: string;
}

// ==================== Create Review (Authenticated) ====================
const createReview = async (userId: string, payload: ICreateReviewPayload) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError(404, 'User not found');

    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email;

    const review = await Review.create({
        user: userId,
        name,
        avatar: user.avatar || '',
        designation: payload.designation || '',
        course: payload.course || '',
        rating: Number(payload.rating),
        comment: payload.comment,
        status: 'approved', // visible on the website immediately
    });

    return review;
};

// ==================== Get Approved Reviews (Public) ====================
const getApprovedReviews = async () => {
    return Review.find({ status: 'approved' }).sort({ createdAt: -1 });
};

// ==================== Get All Reviews (Admin) ====================
const getAllReviews = async (
    filters: { status?: string },
    options: { page: number; limit: number }
) => {
    const query: Record<string, unknown> = {};
    if (filters.status) query.status = filters.status;

    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        Review.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Review.countDocuments(query),
    ]);

    return { data, meta: { page, limit, total } };
};

// ==================== Update Status (Admin) ====================
const updateStatus = async (id: string, status: 'approved' | 'pending') => {
    const review = await Review.findByIdAndUpdate(id, { status }, { new: true });
    if (!review) throw new AppError(404, 'Review not found');
    return review;
};

// ==================== Delete Review (Admin) ====================
const deleteReview = async (id: string) => {
    const review = await Review.findByIdAndDelete(id);
    if (!review) throw new AppError(404, 'Review not found');
    return review;
};

export const ReviewService = {
    createReview,
    getApprovedReviews,
    getAllReviews,
    updateStatus,
    deleteReview,
};
