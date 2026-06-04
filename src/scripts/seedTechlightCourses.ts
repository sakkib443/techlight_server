import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const categorySchema = new mongoose.Schema({ name: String, slug: String, description: String, icon: String, status: { type: String, default: 'active' }, type: { type: String, default: 'course' } }, { timestamps: true });
const courseSchema = new mongoose.Schema({
    title: String, titleBn: String, slug: { type: String, unique: true }, description: String, descriptionBn: String,
    shortDescription: String, thumbnail: String, category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [String], price: Number, discountPrice: Number, currency: { type: String, default: 'BDT' },
    isFree: { type: Boolean, default: false }, courseType: { type: String, default: 'recorded' },
    level: { type: String, default: 'beginner' }, language: { type: String, default: 'none' },
    totalDuration: Number, totalLessons: Number, totalModules: Number,
    features: [String], requirements: [String], whatYouWillLearn: [String], targetAudience: [String],
    jobOpportunities: [String], softwareWeLearn: [String], faq: [{ question: String, answer: String }],
    status: { type: String, default: 'published' }, isFeatured: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false }, totalEnrollments: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }, totalReviews: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 }, instructorName: String, publishedAt: Date,
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

const cats = [
    { name: 'Graphics Design', slug: 'graphics-design', description: 'গ্রাফিক্স ডিজাইন কোর্সসমূহ', icon: 'LuPalette' },
    { name: 'Video Editing', slug: 'video-editing', description: 'ভিডিও এডিটিং কোর্সসমূহ', icon: 'LuFilm' },
    { name: 'Digital Marketing', slug: 'digital-marketing', description: 'ডিজিটাল মার্কেটিং কোর্সসমূহ', icon: 'LuMegaphone' },
    { name: 'WordPress', slug: 'wordpress', description: 'ওয়ার্ডপ্রেস কোর্সসমূহ', icon: 'LuGlobe' },
    { name: 'Motion Graphics', slug: 'motion-graphics', description: 'মোশন গ্রাফিক্স কোর্সসমূহ', icon: 'LuZap' },
];

const getCourses = (ids: any) => [
    {
        title: 'Complete Graphics Design with Photoshop & Illustrator',
        titleBn: 'সম্পূর্ণ গ্রাফিক্স ডিজাইন কোর্স',
        slug: 'complete-graphics-design-photoshop-illustrator',
        description: 'Adobe Photoshop ও Illustrator দিয়ে প্রফেশনাল গ্রাফিক্স ডিজাইন শিখুন। লোগো, ব্যানার, পোস্টার, সোশ্যাল মিডিয়া পোস্ট তৈরি করুন।',
        descriptionBn: 'Adobe Photoshop ও Illustrator দিয়ে প্রফেশনাল গ্রাফিক্স ডিজাইন শিখুন।',
        shortDescription: 'Photoshop ও Illustrator দিয়ে প্রফেশনাল ডিজাইনার হোন',
        thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
        category: ids['graphics-design'],
        tags: ['photoshop', 'illustrator', 'graphics', 'design', 'logo', 'banner'],
        price: 4500, discountPrice: 2500, currency: 'BDT', isFree: false,
        courseType: 'recorded', level: 'beginner', language: 'none',
        totalDuration: 3000, totalLessons: 120, totalModules: 10,
        features: ['৫০+ ঘণ্টার ভিডিও', 'লাইফটাইম অ্যাক্সেস', 'সার্টিফিকেট', 'প্রজেক্ট ফাইলস'],
        requirements: ['কম্পিউটার ব্যবহারের বেসিক জ্ঞান', 'Adobe Creative Cloud'],
        whatYouWillLearn: ['Photoshop দিয়ে ফটো এডিটিং', 'Illustrator দিয়ে লোগো ডিজাইন', 'সোশ্যাল মিডিয়া পোস্ট ডিজাইন', 'প্রিন্ট ডিজাইন'],
        targetAudience: ['নতুন ডিজাইনার', 'ফ্রিল্যান্সার', 'মার্কেটার'],
        jobOpportunities: ['গ্রাফিক্স ডিজাইনার', 'ফ্রিল্যান্সার', 'ক্রিয়েটিভ ডিরেক্টর'],
        softwareWeLearn: ['Adobe Photoshop', 'Adobe Illustrator'],
        faq: [{ question: 'কোর্সটি কি বাংলায়?', answer: 'হ্যাঁ, সম্পূর্ণ বাংলায়।' }],
        status: 'published', isFeatured: true, isPopular: true,
        totalEnrollments: 320, averageRating: 4.8, totalReviews: 85, totalViews: 1200,
        instructorName: 'Md. Rakibul Islam', publishedAt: new Date(),
    },
    {
        title: 'Professional Video Editing with Premiere Pro',
        titleBn: 'প্রফেশনাল ভিডিও এডিটিং কোর্স',
        slug: 'professional-video-editing-premiere-pro',
        description: 'Adobe Premiere Pro দিয়ে প্রফেশনাল ভিডিও এডিটিং শিখুন। YouTube, Facebook, TikTok এর জন্য আকর্ষণীয় ভিডিও তৈরি করুন।',
        descriptionBn: 'Adobe Premiere Pro দিয়ে প্রফেশনাল ভিডিও এডিটিং শিখুন।',
        shortDescription: 'Premiere Pro দিয়ে প্রফেশনাল ভিডিও এডিটর হোন',
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
        category: ids['video-editing'],
        tags: ['premiere pro', 'video editing', 'youtube', 'facebook', 'content creation'],
        price: 4000, discountPrice: 2200, currency: 'BDT', isFree: false,
        courseType: 'recorded', level: 'beginner', language: 'none',
        totalDuration: 2400, totalLessons: 90, totalModules: 8,
        features: ['৪০+ ঘণ্টার ভিডিও', 'প্রজেক্ট ফাইলস', 'সার্টিফিকেট', 'ফ্রি আপডেট'],
        requirements: ['কম্পিউটার বেসিক', 'Adobe Premiere Pro'],
        whatYouWillLearn: ['ভিডিও কাটিং ও ট্রিমিং', 'কালার গ্রেডিং', 'অডিও মিক্সিং', 'টাইটেল ও ইফেক্ট'],
        targetAudience: ['কন্টেন্ট ক্রিয়েটর', 'ফ্রিল্যান্সার', 'ভিডিওগ্রাফার'],
        jobOpportunities: ['ভিডিও এডিটর', 'কন্টেন্ট ক্রিয়েটর', 'ইউটিউবার'],
        softwareWeLearn: ['Adobe Premiere Pro', 'Adobe Audition'],
        faq: [{ question: 'After Effects লাগবে?', answer: 'না, শুধু Premiere Pro দিয়েই কোর্সটি করা যাবে।' }],
        status: 'published', isFeatured: true, isPopular: false,
        totalEnrollments: 210, averageRating: 4.7, totalReviews: 62, totalViews: 980,
        instructorName: 'Md. Sohel Rana', publishedAt: new Date(),
    },
    {
        title: 'Motion Graphics with After Effects',
        titleBn: 'মোশন গ্রাফিক্স কোর্স After Effects',
        slug: 'motion-graphics-after-effects',
        description: 'Adobe After Effects দিয়ে অ্যানিমেশন ও মোশন গ্রাফিক্স শিখুন। ইন্ট্রো, আউট্রো, লোগো অ্যানিমেশন তৈরি করুন।',
        descriptionBn: 'Adobe After Effects দিয়ে প্রফেশনাল মোশন গ্রাফিক্স শিখুন।',
        shortDescription: 'After Effects দিয়ে মোশন গ্রাফিক্স ডিজাইনার হোন',
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
        category: ids['motion-graphics'],
        tags: ['after effects', 'motion graphics', 'animation', 'intro', 'logo animation'],
        price: 5000, discountPrice: 2800, currency: 'BDT', isFree: false,
        courseType: 'recorded', level: 'intermediate', language: 'none',
        totalDuration: 2700, totalLessons: 100, totalModules: 9,
        features: ['৪৫+ ঘণ্টার ভিডিও', 'প্রজেক্ট ফাইলস', 'সার্টিফিকেট'],
        requirements: ['ভিডিও এডিটিং বেসিক', 'Adobe After Effects'],
        whatYouWillLearn: ['কীফ্রেম অ্যানিমেশন', 'লোগো অ্যানিমেশন', 'টেক্সট অ্যানিমেশন', 'পার্টিকেল ইফেক্ট'],
        targetAudience: ['ভিডিও এডিটর', 'গ্রাফিক্স ডিজাইনার', 'কন্টেন্ট ক্রিয়েটর'],
        jobOpportunities: ['মোশন গ্রাফিক্স ডিজাইনার', 'ভিজ্যুয়াল ইফেক্ট আর্টিস্ট'],
        softwareWeLearn: ['Adobe After Effects', 'Adobe Premiere Pro'],
        faq: [{ question: 'Photoshop জানা লাগবে?', answer: 'না, তবে জানলে সুবিধা হবে।' }],
        status: 'published', isFeatured: false, isPopular: true,
        totalEnrollments: 180, averageRating: 4.9, totalReviews: 45, totalViews: 750,
        instructorName: 'Farhan Ahmed', publishedAt: new Date(),
    },
    {
        title: 'Digital Marketing Complete Course',
        titleBn: 'ডিজিটাল মার্কেটিং সম্পূর্ণ কোর্স',
        slug: 'digital-marketing-complete-course-bd',
        description: 'SEO, Facebook Ads, Google Ads, Email Marketing, Content Marketing শিখুন। যেকোনো ব্যবসা অনলাইনে বাড়ান।',
        descriptionBn: 'SEO, Facebook Ads, Google Ads দিয়ে অনলাইন ব্যবসা বাড়ান।',
        shortDescription: 'ডিজিটাল মার্কেটিং দিয়ে অনলাইনে ক্যারিয়ার গড়ুন',
        thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
        category: ids['digital-marketing'],
        tags: ['seo', 'facebook ads', 'google ads', 'email marketing', 'social media'],
        price: 4500, discountPrice: 2500, currency: 'BDT', isFree: false,
        courseType: 'recorded', level: 'beginner', language: 'none',
        totalDuration: 3600, totalLessons: 140, totalModules: 12,
        features: ['৬০+ ঘণ্টার ভিডিও', 'লাইভ ক্যাম্পেইন', 'সার্টিফিকেট'],
        requirements: ['স্মার্টফোন বা কম্পিউটার', 'ইন্টারনেট সংযোগ'],
        whatYouWillLearn: ['Facebook & Google Ads', 'SEO অপটিমাইজেশন', 'ইমেইল মার্কেটিং', 'কন্টেন্ট স্ট্র্যাটেজি'],
        targetAudience: ['ব্যবসায়ী', 'ফ্রিল্যান্সার', 'মার্কেটার'],
        jobOpportunities: ['ডিজিটাল মার্কেটার', 'SEO এক্সপার্ট', 'Social Media Manager'],
        softwareWeLearn: ['Facebook Ads Manager', 'Google Ads', 'Mailchimp'],
        faq: [{ question: 'কোনো অভিজ্ঞতা লাগবে?', answer: 'না, শূন্য থেকে শেখানো হবে।' }],
        status: 'published', isFeatured: true, isPopular: true,
        totalEnrollments: 450, averageRating: 4.8, totalReviews: 120, totalViews: 2100,
        instructorName: 'Md. Jahidul Islam', publishedAt: new Date(),
    },
    {
        title: 'WordPress Website Development',
        titleBn: 'ওয়ার্ডপ্রেস ওয়েবসাইট ডেভেলপমেন্ট',
        slug: 'wordpress-website-development-bd',
        description: 'WordPress দিয়ে প্রফেশনাল ওয়েবসাইট তৈরি করুন। WooCommerce দিয়ে ই-কমার্স সাইট বানান। Elementor দিয়ে ডিজাইন করুন।',
        descriptionBn: 'WordPress দিয়ে প্রফেশনাল ওয়েবসাইট ও ই-কমার্স সাইট তৈরি করুন।',
        shortDescription: 'WordPress দিয়ে প্রফেশনাল ওয়েব ডেভেলপার হোন',
        thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
        category: ids['wordpress'],
        tags: ['wordpress', 'elementor', 'woocommerce', 'website', 'ecommerce'],
        price: 3500, discountPrice: 2000, currency: 'BDT', isFree: false,
        courseType: 'recorded', level: 'beginner', language: 'none',
        totalDuration: 2400, totalLessons: 100, totalModules: 8,
        features: ['৪০+ ঘণ্টার ভিডিও', 'থিম ফাইলস', 'সার্টিফিকেট', 'ফ্রি হোস্টিং গাইড'],
        requirements: ['কম্পিউটার বেসিক', 'ইন্টারনেট সংযোগ'],
        whatYouWillLearn: ['WordPress ইনস্টলেশন', 'Elementor দিয়ে ডিজাইন', 'WooCommerce সেটআপ', 'SEO অপটিমাইজেশন'],
        targetAudience: ['উদ্যোক্তা', 'ফ্রিল্যান্সার', 'ব্যবসায়ী'],
        jobOpportunities: ['WordPress ডেভেলপার', 'ফ্রিল্যান্সার', 'ওয়েব ডিজাইনার'],
        softwareWeLearn: ['WordPress', 'Elementor', 'WooCommerce'],
        faq: [{ question: 'কোডিং জানা লাগবে?', answer: 'না, কোনো কোডিং ছাড়াই শেখা যাবে।' }],
        status: 'published', isFeatured: false, isPopular: true,
        totalEnrollments: 290, averageRating: 4.6, totalReviews: 78, totalViews: 1400,
        instructorName: 'Taslima Begum', publishedAt: new Date(),
    },
];

async function seed() {
    try {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) { console.error('❌ DATABASE_URL not found'); process.exit(1); }
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(dbUrl);
        console.log('✅ Connected!\n📁 Creating categories...');
        const ids: any = {};
        for (const cat of cats) {
            const ex = await Category.findOne({ slug: cat.slug });
            if (ex) { ids[cat.slug] = ex._id; console.log(`   ⏭️  ${cat.name} exists`); }
            else { const c = await Category.create(cat); ids[cat.slug] = c._id; console.log(`   ✅ Created: ${cat.name}`); }
        }
        console.log('\n📚 Creating courses...');
        for (const course of getCourses(ids)) {
            const ex = await Course.findOne({ slug: course.slug });
            if (ex) console.log(`   ⏭️  ${course.title} exists`);
            else { await Course.create(course); console.log(`   ✅ Created: ${course.title}`); }
        }
        console.log('\n🎉 Done! 5 categories + 5 courses seeded.');
        await mongoose.disconnect();
        process.exit(0);
    } catch (e) { console.error('❌ Error:', e); process.exit(1); }
}

seed();
