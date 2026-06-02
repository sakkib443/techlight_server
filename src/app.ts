// ===================================================================
// Techlight IT Institute LMS - Main Application File
// Express app setup with all routes and middleware
// মূল এপ্লিকেশন ফাইল - সব routes এবং middleware এখানে connect হয়েছে
// ===================================================================

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';

// ==================== Middleware Imports ====================
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import config from './app/config';

// ==================== Route Imports ====================
import { AuthRoutes } from './app/modules/auth/auth.routes';
import { UserRoutes } from './app/modules/user/user.routes';
import { CategoryRoutes } from './app/modules/category/category.routes';

import { CartRoutes } from './app/modules/cart/cart.module';
import { OrderRoutes } from './app/modules/order/order.module';
import { BkashRoutes } from './app/modules/bkash/bkash.module';
import { AnalyticsRoutes } from './app/modules/analytics/analytics.module';
import { uploadRoutes } from './app/modules/upload/upload.routes';
import { CourseRoutes } from './app/modules/course/course.routes';
import { LessonRoutes } from './app/modules/lesson/lesson.routes';
import { ModuleRoutes } from './app/modules/module/module.routes';
import { EnrollmentRoutes } from './app/modules/enrollment/enrollment.routes';
import { NotificationRoutes } from './app/modules/notification/notification.module';
import { StatsRoutes } from './app/modules/stats/stats.routes';
import { CouponRoutes } from './app/modules/coupon/coupon.routes';
import { BlogRoutes } from './app/modules/blog/blog.routes';
import { BatchRoutes } from './app/modules/batch/batch.routes';
import { CertificateRoutes } from './app/modules/certificate/certificate.routes';
import { LiveClassRoutes } from './app/modules/liveClass/liveClass.routes';
import { InstructorRoutes } from './app/modules/instructor/instructor.routes';
import { DesignRoutes } from './app/modules/design/design.routes';


// ==================== App Initialization ====================
const app: Application = express();

// ==================== Global Middlewares ====================

// Debugging Middleware - Log all incoming requests
app.use(async (req: Request, res: Response, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  try {
    // Ensure DB is connected for every request
    await import('./server').then(m => m.connectDB());
    next();
  } catch (error) {
    console.error('Database connection failed during request', error);
    next(error);
  }
});

// JSON body parser
app.use(express.json({ limit: '10mb' }));

// URL encoded parser
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser (for refresh token)
app.use(cookieParser());

// CORS configuration - supports multiple origins for production
const allowedOrigins = [
  config.frontend_url,
  'http://localhost:3000',
  'https://hiictpark.vercel.app',
  'https://hiictpark-frontend.vercel.app',
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all origins in production for API
      }
    },
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ==================== Health Check Route ====================
app.get('/', (req: Request, res: Response) => {
  console.log('Health check called - Backend is active');
  res.status(200).json({
    success: true,
    message: '🚀 Techlight IT Institute LMS API Server is running!',
    version: '1.0.0',
    environment: config.env,
    timestamp: new Date().toISOString(),
  });
});

// ==================== API Health Check ====================
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    uptime: process.uptime(),
  });
});

// ==================== API Routes ====================
// Authentication routes (public)
app.use('/api/auth', AuthRoutes);

// User routes (authenticated)
app.use('/api/users', UserRoutes);

// Category routes (public + admin)
app.use('/api/categories', CategoryRoutes);

// Course routes (LMS - public + admin)
app.use('/api/courses', CourseRoutes);

// Module routes (LMS - public + admin)
app.use('/api/modules', ModuleRoutes);

// Lesson routes (LMS - public + admin)
app.use('/api/lessons', LessonRoutes);

// Enrollment routes (LMS - authenticated)
app.use('/api/enrollments', EnrollmentRoutes);

// Cart routes (authenticated)
app.use('/api/cart', CartRoutes);

// Order routes (authenticated)
app.use('/api/orders', OrderRoutes);

// bKash Payment routes (authenticated)
app.use('/api/bkash', BkashRoutes);

// Analytics routes (admin only)
app.use('/api/analytics', AnalyticsRoutes);

// Upload routes (authenticated)
app.use('/api/upload', uploadRoutes);

// Notification routes (admin only)
app.use('/api/notifications', NotificationRoutes);

// Stats routes (real-time database statistics)
app.use('/api/stats', StatsRoutes);

// Coupon routes (discount codes)
app.use('/api/coupons', CouponRoutes);

// Blog routes (blog posts and comments)
app.use('/api/blogs', BlogRoutes);

// Batch routes (course batches for online courses)
app.use('/api/batches', BatchRoutes);

// Certificate routes (student certificates - issue, list, verify)
app.use('/api/certificates', CertificateRoutes);

// Live Class routes (live classes for batches)
app.use('/api/live-classes', LiveClassRoutes);

// Instructor routes
app.use('/api/instructors', InstructorRoutes);

// Site Content / Design routes (contact info, top header, social links)
app.use('/api/design', DesignRoutes);
app.use('/api/designs', DesignRoutes); // alias used by TopHeader (plural)

// ==================== Error Handling ====================
// 404 Not Found handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(globalErrorHandler);

export default app;
