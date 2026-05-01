// ===================================================================
// ExtraWeb Backend - Order Module
// Purchase/Order management
// ===================================================================

import { Schema, model, Types } from 'mongoose';
import { z } from 'zod';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../utils/AppError';
import express from 'express';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import DownloadService from '../download/download.module';
import EmailService from '../email/email.service';
import { User } from '../user/user.model';
import { NotificationService } from '../notification/notification.module';

// ==================== INTERFACE ====================
export interface IOrderItem {
    product: Types.ObjectId;
    productType: 'website' | 'design-template' | 'course';

    title: string;
    price: number;
    image?: string;
}

export interface IOrder {
    _id?: Types.ObjectId;
    orderNumber: string;
    user: Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentMethod: string;
    transactionId?: string;
    orderDate: Date;
    manualPaymentDetails?: {
        method: string;
        senderNumber: string;
        transactionId: string;
        time: string;
        date: string;
    };
    discountAmount: number;
    couponCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// ==================== MODEL ====================
const orderSchema = new Schema<IOrder>(
    {
        orderNumber: { type: String, required: true, unique: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                product: { type: Schema.Types.ObjectId, required: true },
                productType: { type: String, enum: ['website', 'design-template', 'course'], required: true },

                title: { type: String, required: true },
                price: { type: Number, required: true },
                image: { type: String },
            },
        ],
        totalAmount: { type: Number, required: true },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending',
        },
        paymentMethod: { type: String, default: 'stripe' },
        transactionId: { type: String },
        manualPaymentDetails: {
            method: { type: String },
            senderNumber: { type: String },
            transactionId: { type: String },
            time: { type: String },
            date: { type: String }
        },
        discountAmount: { type: Number, default: 0 },
        couponCode: { type: String },
        orderDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

orderSchema.index({ user: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ paymentStatus: 1 });

export const Order = model<IOrder>('Order', orderSchema);

// ==================== VALIDATION ====================
export const createOrderValidation = z.object({
    body: z.object({
        items: z.array(
            z.object({
                productId: z.string(),
                productType: z.enum(['website', 'design-template', 'course']),

                title: z.string(),
                price: z.number(),
                image: z.string().optional(),
            })
        ).min(1, 'At least one item is required'),
        paymentMethod: z.string().optional(),
        paymentStatus: z.enum(['pending', 'completed', 'failed', 'refunded']).optional(),
        discountAmount: z.number().optional(),
        couponCode: z.string().optional(),
    }),
});

export const guestCheckoutValidation = z.object({
    body: z.object({
        fullName: z.string({
            required_error: 'Full Name is required',
        }).min(1, 'Full Name is required'),
        email: z.string({
            required_error: 'Email is required',
        }).email('Please provide a valid email'),
        phone: z.string({
            required_error: 'Phone Number is required',
        }).min(6, 'Phone Number is too short'),
        address: z.string().optional().default(''),
        items: z.array(
            z.object({
                productId: z.string(),
                productType: z.enum(['website', 'design-template', 'course']),
                title: z.string(),
                price: z.coerce.number(),
                image: z.string().optional().default(''),
            })
        ).min(1, 'At least one item is required'),
        paymentMethod: z.string().optional().default('manual'),
        manualMethod: z.string().optional().default('bkash'),
        senderNumber: z.string().optional().default(''),
        transactionId: z.string().optional().default(''),
        time: z.string().optional().default(''),
        date: z.string().optional().default(''),
        discountAmount: z.coerce.number().optional().default(0),
        couponCode: z.string().optional().default(''),
    })
});
// ==================== SERVICE ====================
// Generate unique order number
const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `EW-${timestamp}-${random}`;
};

const deliverOrderItems = async (order: any, rawItems?: any[]): Promise<void> => {
    const userId = order.user.toString();
    const itemsToDeliver = rawItems || order.items;

    for (const item of itemsToDeliver) {
        try {
            const productId = item.productId || item.product;

            if (item.productType === 'course') {
                const { EnrollmentService } = await import('../enrollment/enrollment.service');
                const { Course } = await import('../course/course.model');
                try {
                    await EnrollmentService.enrollStudent(userId, productId, order._id!.toString());
                    // Increment totalEnrollments for course
                    await Course.findByIdAndUpdate(productId, { $inc: { totalEnrollments: 1 } });
                    console.log(`Enrolled user ${userId} in course ${productId}`);
                } catch (enrollError: any) {
                    // Ignore "already enrolled" errors but log others
                    if (enrollError.statusCode !== 400) {
                        console.error(`Enrollment failed for ${productId}:`, enrollError);
                    }
                }
            } else if (item.productType === 'website') {
                const { Website } = await import('../website/website.model');
                await Website.findByIdAndUpdate(productId, { $inc: { salesCount: 1 } });
                await DownloadService.createDownloadRecord(
                    userId,
                    order._id!.toString(),
                    productId,
                    item.productType,
                    item.title
                );
            } else if (item.productType === 'design-template' || item.productType === 'software') {
                const { DesignTemplate } = await import('../designTemplate/designTemplate.model');
                await DesignTemplate.findByIdAndUpdate(productId, { $inc: { salesCount: 1 } });
                await DownloadService.createDownloadRecord(
                    userId,
                    order._id!.toString(),
                    productId,
                    item.productType,
                    item.title
                );
            }

        } catch (error) {
            console.error(`Failed to deliver ${item.title}:`, error);
        }
    }

    // Send invoice email
    try {
        const user = await User.findById(userId);
        if (user) {
            EmailService.sendInvoiceEmail(user.email, {
                firstName: user.firstName,
                email: user.email,
                orderId: order._id!.toString(),
                items: itemsToDeliver.map((item: any) => ({
                    title: item.title,
                    price: item.price,
                    productType: item.productType
                })),
                totalAmount: order.totalAmount,
                paymentMethod: order.paymentMethod,
                transactionId: order.transactionId,
                orderDate: order.orderDate
            }).catch(err => console.error('Invoice email error:', err));
        }
    } catch (error) {
        console.error('Failed to send invoice email:', error);
    }
};

const OrderService = {
    async createOrder(
        userId: string,
        items: Array<{ productId: string; productType: 'website' | 'design-template' | 'course'; title: string; price: number; image?: string }>,
        paymentMethod: string = 'stripe',
        paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded' = 'pending',
        discountAmount: number = 0,
        couponCode?: string
    ): Promise<IOrder> {
        console.log(`Processing order for user: ${userId}, items count: ${items.length}`);

        const orderItems = items.map((item) => ({
            product: new Types.ObjectId(item.productId),
            productType: item.productType,
            title: item.title,
            price: item.price,
            image: item.image,
        }));

        const totalAmount = Math.max(0, items.reduce((sum, item) => sum + item.price, 0) - discountAmount);

        const order = await Order.create({
            orderNumber: generateOrderNumber(),
            user: userId,
            items: orderItems,
            totalAmount,
            discountAmount,
            couponCode,
            paymentMethod,
            paymentStatus,
            orderDate: new Date(),
        });

        // Create notification for admin immediately when order is placed
        try {
            const user = await User.findById(userId);
            if (user) {
                const productTitles = items.map(item => item.title).join(', ');
                await NotificationService.createOrderNotification({
                    orderId: order._id,
                    userId: new Types.ObjectId(userId),
                    userName: `${user.firstName} ${user.lastName || ''}`.trim(),
                    amount: totalAmount,
                    productName: productTitles.length > 50 ? productTitles.substring(0, 47) + '...' : productTitles,
                });
            }
        } catch (err) {
            console.error('Order notification error:', err);
        }

        // If payment is completed, handle delivery (downloads or enrollments)
        if (paymentStatus === 'completed') {
            await deliverOrderItems(order, items);
        }

        return order;
    },

    async getUserOrders(userId: string, page = 1, limit = 10): Promise<{ data: IOrder[]; total: number }> {
        const skip = (page - 1) * limit;
        const [orders, total] = await Promise.all([
            Order.find({ user: userId }).sort({ orderDate: -1 }).skip(skip).limit(limit),
            Order.countDocuments({ user: userId }),
        ]);
        return { data: orders, total };
    },

    async getOrderById(orderId: string, userId: string): Promise<IOrder> {
        const order = await Order.findOne({ _id: orderId, user: userId });
        if (!order) throw new AppError(404, 'Order not found');
        return order;
    },

    async updatePaymentStatus(orderId: string, status: IOrder['paymentStatus'], transactionId?: string): Promise<IOrder> {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus: status, transactionId },
            { new: true }
        );
        if (!order) throw new AppError(404, 'Order not found');

        // If transitioning to completed, trigger delivery
        if (status === 'completed') {
            await deliverOrderItems(order);
        }

        return order;
    },

    async getAllOrders(page = 1, limit = 10, status?: string): Promise<{ data: IOrder[]; total: number }> {
        const query: any = {};
        if (status) query.paymentStatus = status;

        const skip = (page - 1) * limit;
        const [orders, total] = await Promise.all([
            Order.find(query).populate('user', 'firstName lastName email').sort({ orderDate: -1 }).skip(skip).limit(limit),
            Order.countDocuments(query),
        ]);
        return { data: orders, total };
    },

    async submitManualPayment(orderId: string, userId: string, details: any): Promise<IOrder> {
        const order = await Order.findOne({ _id: orderId, user: userId });
        if (!order) throw new AppError(404, 'Order not found');

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                paymentMethod: 'manual',
                manualPaymentDetails: {
                    method: details.method,
                    senderNumber: details.senderNumber,
                    transactionId: details.transactionId,
                    time: details.time,
                    date: details.date
                },
                transactionId: details.transactionId // Map the main transaction ID too
            },
            { new: true }
        );

        if (!updatedOrder) throw new AppError(404, 'Order not found');
        return updatedOrder;
    },

    async deleteOrder(orderId: string): Promise<void> {
        const order = await Order.findById(orderId);
        if (!order) throw new AppError(404, 'Order not found');

        const userId = order.user.toString();

        // Check if there are any course enrollments related to this order and delete them
        for (const item of order.items) {
            if (item.productType === 'course') {
                try {
                    const productId = item.product;
                    const { Enrollment } = await import('../enrollment/enrollment.model');

                    // Delete the specific enrollment linked to this user, course, and optionally order
                    const deleted = await Enrollment.findOneAndDelete({
                        student: userId,
                        course: productId
                    });

                    // Decrement totalEnrollments for course if an enrollment was actually deleted
                    if (deleted) {
                        const { Course } = await import('../course/course.model');
                        await Course.findByIdAndUpdate(productId, { $inc: { totalEnrollments: -1 } });
                    }
                } catch (err) {
                    console.error('Error deleting related enrollment:', err);
                }
            }
        }

        await Order.findByIdAndDelete(orderId);
    },
};

// ==================== CONTROLLER ====================
const OrderController = {
    createOrder: catchAsync(async (req: Request, res: Response) => {
        const { items, paymentMethod, paymentStatus, discountAmount, couponCode } = req.body;
        const order = await OrderService.createOrder(req.user!.userId, items, paymentMethod, paymentStatus, discountAmount, couponCode);
        sendResponse(res, { statusCode: 201, success: true, message: 'Order created', data: order });
    }),

    getMyOrders: catchAsync(async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await OrderService.getUserOrders(req.user!.userId, page, limit);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Orders fetched',
            meta: { page, limit, total: result.total, totalPages: Math.ceil(result.total / limit) },
            data: result.data,
        });
    }),

    getOrderById: catchAsync(async (req: Request, res: Response) => {
        const order = await OrderService.getOrderById(req.params.id, req.user!.userId);
        sendResponse(res, { statusCode: 200, success: true, message: 'Order fetched', data: order });
    }),

    // Admin
    getAllOrders: catchAsync(async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const status = req.query.status as string | undefined;
        const result = await OrderService.getAllOrders(page, limit, status);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Orders fetched',
            meta: { page, limit, total: result.total, totalPages: Math.ceil(result.total / limit) },
            data: result.data,
        });
    }),

    updateOrderStatus: catchAsync(async (req: Request, res: Response) => {
        const { status, transactionId } = req.body;
        const order = await OrderService.updatePaymentStatus(req.params.id, status, transactionId);
        sendResponse(res, { statusCode: 200, success: true, message: 'Order updated', data: order });
    }),

    submitManualPayment: catchAsync(async (req: Request, res: Response) => {
        const orderId = req.params.id;
        const userId = req.user!.userId;
        const order = await OrderService.submitManualPayment(orderId, userId, req.body);
        sendResponse(res, { statusCode: 200, success: true, message: 'Manual payment submitted successfully', data: order });
    }),

    deleteOrder: catchAsync(async (req: Request, res: Response) => {
        await OrderService.deleteOrder(req.params.id);
        sendResponse(res, { statusCode: 200, success: true, message: 'Order and associated records deleted successfully', data: null });
    }),

    // Guest Checkout - No login required
    guestCheckout: catchAsync(async (req: Request, res: Response) => {
        const {
            fullName, email, phone, address,
            items, paymentMethod, manualMethod,
            senderNumber, transactionId, time, date,
            discountAmount, couponCode
        } = req.body;

        // Step 1: Check if user exists, if not create one
        let userId: string;
        let tokens: any = null;
        let userData: any = null;
        let isNewUser = false;

        const existingUser = await User.findOne({ email, isDeleted: { $ne: true } });

        if (existingUser) {
            // User exists - use their ID
            userId = existingUser._id!.toString();

            // Generate tokens for auto-login
            const AuthService = (await import('../auth/auth.service')).default;
            const jwtPayload = {
                userId: existingUser._id!.toString(),
                email: existingUser.email,
                role: existingUser.role as 'admin' | 'mentor' | 'student',
            };
            tokens = AuthService.generateTokens(jwtPayload);
            userData = {
                _id: existingUser._id!.toString(),
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                role: existingUser.role,
                avatar: existingUser.avatar,
            };
        } else {
            // Create new user with email as ID, phone as password
            const nameParts = fullName.trim().split(' ');
            const firstName = nameParts[0] || 'User';
            const lastName = nameParts.slice(1).join(' ') || '';

            const newUser = await User.create({
                email,
                password: phone, // Phone number as password
                firstName,
                lastName,
                phone,
                address,
                role: 'student',
                status: 'active',
                isEmailVerified: false,
            });

            userId = newUser._id!.toString();
            isNewUser = true;

            // Generate tokens for auto-login
            const AuthService = (await import('../auth/auth.service')).default;
            const jwtPayload = {
                userId: newUser._id!.toString(),
                email: newUser.email,
                role: newUser.role as 'admin' | 'mentor' | 'student',
            };
            tokens = AuthService.generateTokens(jwtPayload);
            userData = {
                _id: newUser._id!.toString(),
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
                avatar: newUser.avatar,
            };

            // Send welcome email (async)
            EmailService.sendWelcomeEmail(newUser.email, newUser.firstName).catch(err =>
                console.error('Welcome email error:', err)
            );
        }

        // Step 2: Create Order
        const order = await OrderService.createOrder(
            userId,
            items,
            paymentMethod || 'manual',
            'pending',
            discountAmount || 0,
            couponCode
        );

        // Step 3: Submit manual payment details
        if (paymentMethod === 'manual' && senderNumber && transactionId) {
            await OrderService.submitManualPayment(order._id!.toString(), userId, {
                method: manualMethod || 'bkash',
                senderNumber,
                transactionId,
                time: time || '',
                date: date || new Date().toISOString().split('T')[0],
            });
        }

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: isNewUser
                ? 'Order placed & account created successfully!'
                : 'Order placed successfully!',
            data: {
                order,
                user: userData,
                tokens,
                isNewUser,
            },
        });
    }),
};

// ==================== ROUTES ====================
const router = express.Router();

// Guest checkout - No auth required
router.post('/guest-checkout', validateRequest(guestCheckoutValidation), OrderController.guestCheckout);

router.post('/', authMiddleware, validateRequest(createOrderValidation), OrderController.createOrder);
router.get('/my', authMiddleware, OrderController.getMyOrders);
router.get('/my/:id', authMiddleware, OrderController.getOrderById);
router.patch('/:id/manual-payment', authMiddleware, OrderController.submitManualPayment);

// Admin
router.get('/admin/all', authMiddleware, authorizeRoles('admin'), OrderController.getAllOrders);
router.patch('/admin/:id/status', authMiddleware, authorizeRoles('admin'), OrderController.updateOrderStatus);
router.delete('/admin/:id', authMiddleware, authorizeRoles('admin'), OrderController.deleteOrder);

export const OrderRoutes = router;
export default OrderService;

