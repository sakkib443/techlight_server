/**
 * FAQ Seed Script (English only)
 * Inserts the default FAQ set into the database.
 *
 * Usage: npx ts-node src/scripts/seedFaqs.ts
 *
 * Note: if FAQs already exist this script skips seeding so existing
 * (including admin-added) data is never overwritten. To re-seed,
 * clear the `faqs` collection first.
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import mongoose from 'mongoose';
import { Faq } from '../app/modules/faq/faq.model';
import { IFaq } from '../app/modules/faq/faq.interface';

const MONGO_URI = process.env.DATABASE_URL as string;

const faqs: Partial<IFaq>[] = [
    // ──────── Enrollment ────────
    {
        category: 'enrollment',
        question: 'How do I enroll at Techlight IT Institute?',
        answer:
            "The enrollment process is simple. Register on our website, select your preferred course, complete the payment — and you'll get instant access to your course materials.",
        order: 1,
    },
    {
        category: 'enrollment',
        question: 'Are there any prerequisites for enrollment?',
        answer:
            'Most beginner courses require no prior experience. However, advanced courses recommend basic computer literacy and reading proficiency in English.',
        order: 2,
    },
    {
        category: 'enrollment',
        question: 'Can I enroll in multiple courses at once?',
        answer:
            'Absolutely. You can enroll in as many courses as you like. However, we recommend not taking more than 2-3 courses simultaneously to ensure quality learning.',
        order: 3,
    },
    {
        category: 'enrollment',
        question: 'Is there an enrollment deadline?',
        answer:
            'Our online courses can be started anytime year-round. Live courses follow batch schedules with specific start dates — check the course page for details.',
        order: 4,
    },
    {
        category: 'enrollment',
        question: 'Can I switch to a different course after enrolling?',
        answer:
            'Yes. Within 7 days of enrollment, you can request a course switch through your dashboard or by contacting support — as long as the new course has available seats.',
        order: 5,
    },
    {
        category: 'enrollment',
        question: 'Is there an age limit to join a course?',
        answer:
            'There is no upper age limit. Anyone aged 13 or above can enroll; learners under 18 are encouraged to study with guardian guidance.',
        order: 6,
    },

    // ──────── Payment ────────
    {
        category: 'payment',
        question: 'What payment methods do you accept?',
        answer:
            'We accept bKash, Nagad, Rocket, Visa/Mastercard, and Stripe (international). All payments are 100% secure and SSL encrypted.',
        order: 7,
    },
    {
        category: 'payment',
        question: 'Can I pay in installments?',
        answer:
            "Yes, premium courses offer 2-3 installment options. You'll see this option at checkout, or contact our support team for details.",
        order: 8,
    },
    {
        category: 'payment',
        question: 'What is your refund policy?',
        answer:
            "If you've consumed less than 70% of the content within 7 days of purchase, you're eligible for a 100% refund. See our refund policy page for full details.",
        order: 9,
    },
    {
        category: 'payment',
        question: 'Where do I apply a coupon code?',
        answer:
            'On the checkout page, you\'ll find an "Apply Coupon" box. Enter your code and click "Apply" — the discount will be applied automatically.',
        order: 10,
    },
    {
        category: 'payment',
        question: 'Will I get an invoice or receipt after payment?',
        answer:
            'Yes. A payment receipt is emailed to you instantly and is also available for download anytime from the "Payments" section of your dashboard.',
        order: 11,
    },
    {
        category: 'payment',
        question: 'Is my payment information safe?',
        answer:
            'Absolutely. We never store your card or mobile-banking PIN. All transactions are processed through PCI-DSS compliant, SSL-encrypted payment gateways.',
        order: 12,
    },

    // ──────── Certificate ────────
    {
        category: 'certificate',
        question: 'When will I receive my certificate?',
        answer:
            'Once you complete 100% of the course and pass the final quiz, your digital certificate is generated instantly. Download the PDF from your dashboard.',
        order: 13,
    },
    {
        category: 'certificate',
        question: 'Are the certificates verifiable?',
        answer:
            'Yes. Every certificate has a unique verification ID. Anyone can verify it by entering the ID on our /certification page.',
        order: 14,
    },
    {
        category: 'certificate',
        question: 'Can I add the certificate to LinkedIn?',
        answer:
            'Absolutely. Our certificates come with a direct "Add to LinkedIn" button for the Licenses & Certifications section.',
        order: 15,
    },
    {
        category: 'certificate',
        question: 'Is the certificate free or is there an extra fee?',
        answer:
            'The digital certificate is completely free and included with your course. There is no hidden or additional charge to download it.',
        order: 16,
    },

    // ──────── Course ────────
    {
        category: 'course',
        question: 'Do I get lifetime access to courses?',
        answer:
            'Yes, once you purchase a course, you have lifetime access — including all updates, bonus content, and any future modules at no extra cost.',
        order: 17,
    },
    {
        category: 'course',
        question: 'Can I watch courses on mobile?',
        answer:
            'Yes, our platform is fully responsive and works smoothly on mobile, tablet, and desktop devices.',
        order: 18,
    },
    {
        category: 'course',
        question: 'Can I contact instructors directly?',
        answer:
            'Absolutely. Every course has a Q&A section, and premium students get access to weekly live mentorship sessions.',
        order: 19,
    },
    {
        category: 'course',
        question: 'How long do I have to complete a course?',
        answer:
            "There's no fixed deadline for self-paced courses — you have lifetime access and can learn at your own speed. Live batch courses follow a set schedule.",
        order: 20,
    },
    {
        category: 'course',
        question: 'Are there practice projects or assignments?',
        answer:
            'Yes. Most courses include hands-on projects, assignments, and quizzes so you can apply what you learn and build a real portfolio.',
        order: 21,
    },
    {
        category: 'course',
        question: 'Do you provide job placement or career support?',
        answer:
            'For selected career-track courses we offer CV review, interview preparation, and job-referral support through our hiring partners.',
        order: 22,
    },

    // ──────── Technical ────────
    {
        category: 'technical',
        question: 'Videos are buffering — what should I do?',
        answer:
            'Try lowering the video quality to 720p or 480p. We recommend at least 5 Mbps internet speed. If issues persist, email support@techlight.com.',
        order: 23,
    },
    {
        category: 'technical',
        question: 'I forgot my password — how do I reset it?',
        answer:
            'Click "Forgot Password" on the login page. We\'ll send a reset link to your email — use it to set a new password.',
        order: 24,
    },
    {
        category: 'technical',
        question: 'Can I download courses for offline viewing?',
        answer:
            'Premium plans support offline downloads via our mobile app. Downloaded videos are encrypted and play only within the app.',
        order: 25,
    },
    {
        category: 'technical',
        question: 'Which devices and browsers are supported?',
        answer:
            'Our platform works on any modern device — phone, tablet, laptop, or desktop — using up-to-date Chrome, Firefox, Edge, or Safari browsers.',
        order: 26,
    },
    {
        category: 'technical',
        question: 'How do I contact support if I face a problem?',
        answer:
            'You can reach us anytime via the Contact page, by emailing support@techlight.com, or through live chat on your dashboard — our team replies quickly.',
        order: 27,
    },
];

const seedFaqs = async () => {
    try {
        if (!MONGO_URI) {
            console.error('❌ DATABASE_URL not found in .env');
            process.exit(1);
        }

        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const existing = await Faq.countDocuments();
        if (existing > 0) {
            console.log(
                `ℹ️  ${existing} FAQ(s) already exist — seeding skipped.`
            );
            console.log('   To re-seed, clear the faqs collection first.');
            await mongoose.disconnect();
            process.exit(0);
        }

        const created = await Faq.insertMany(
            faqs.map((f) => ({ ...f, isActive: true }))
        );
        console.log(`🎉 ${created.length} FAQs seeded successfully!`);

        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
};

seedFaqs();
