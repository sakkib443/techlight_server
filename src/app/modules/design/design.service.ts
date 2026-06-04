import { Design } from './design.model';
import { IContactContent, IHeroContent, IProvideContent } from './design.interface';

<<<<<<< HEAD
/**
 * One-time cleanup: detect old/stale contact data from previous client and reset to demo defaults.
 * Triggers when document contains specific hardcoded old company markers.
 */
const cleanupStaleContactData = async (): Promise<void> => {
    const existing = await Design.findBySection('contact');
    if (!existing || !existing.contactContent) return;

    const ci = existing.contactContent.contactInfo;
    const sl = existing.contactContent.socialLinks;
    const map = existing.contactContent.mapEmbedUrl || '';

    // Markers from the old client's data
    const oldMarkers = [
        '01730481212',
        '1829-818616',
        'Daisy Garden',
        'Banasree',
        'Techlight IT Institute.com',
        'facebook.com/Techlight IT Institute',
        '0x3755c754583dd209',
    ];

    const haystack = `${ci?.email || ''} ${ci?.phone || ''} ${ci?.address || ''} ${sl?.facebook || ''} ${sl?.whatsapp || ''} ${map}`;
    const isStale = oldMarkers.some((m) => haystack.includes(m));

    if (isStale) {
        await Design.deleteOne({ section: 'contact' });
    }
};

/**
 * Get design by section
 */
const getDesignBySection = async (section: string): Promise<IDesign | null> => {
    // Auto-cleanup stale contact data once per request (idempotent)
    if (section === 'contact') {
        await cleanupStaleContactData();
    }

    let design = await Design.findBySection(section);
=======
const CONTACT_KEY = 'contact';
const HERO_KEY = 'hero';
const PROVIDE_KEY = 'provide';
>>>>>>> cd51453f7d79d5d78c7c80e636e0922c99bbda03

// ==================== Contact ====================
const getContactContent = async (): Promise<{ contactContent: IContactContent }> => {
    let doc = await Design.findOne({ key: CONTACT_KEY });
    if (!doc) {
        doc = await Design.create({ key: CONTACT_KEY, contactContent: {} });
    }
<<<<<<< HEAD

    // If contact section doesn't exist, create default with DEMO placeholders.
    // Real values must be set via admin panel.
    if (!design && section === 'contact') {
        design = await Design.create({
            section: 'contact',
            contactContent: {
                hero: {
                    badge: 'Get In Touch',
                    badgeBn: 'যোগাযোগ করুন',
                    title1: "Let's ",
                    title1Bn: 'আমাদের সাথে ',
                    title2: 'Connect',
                    title2Bn: 'কথা বলুন',
                    subtitle: "Have questions or feedback? We're here to listen. Reach out through any channel below.",
                    subtitleBn: 'প্রশ্ন আছে? পরামর্শ চান? আমরা আপনার কথা শুনতে প্রস্তুত। যেকোনো মাধ্যমে যোগাযোগ করুন।'
                },
                contactInfo: {
                    email: 'demo@example.com',
                    phone: '+880 1XXX-XXXXXX',
                    address: 'Your City, Country',
                    addressBn: 'আপনার শহর, দেশ',
                    officeHours: 'Sat - Thu: 10:00 AM - 6:00 PM',
                    officeHoursBn: 'শনি - বৃহঃ: সকাল ১০টা - সন্ধ্যা ৬টা'
                },
                socialLinks: {
                    facebook: '#',
                    youtube: '#',
                    linkedin: '#',
                    whatsapp: '#',
                    instagram: '#'
                },
                whatsappSection: {
                    title: 'Instant Chat',
                    titleBn: 'তাৎক্ষণিক চ্যাট',
                    description: 'Chat with us on WhatsApp for the fastest response and instant answers.',
                    descriptionBn: 'WhatsApp এ আমাদের সাথে চ্যাট করুন — সবচেয়ে দ্রুত সাড়া পাবেন।',
                    buttonText: 'Start Chat',
                    buttonTextBn: 'চ্যাট শুরু করুন'
                },
                // Generic Bangladesh view as demo — replace via admin panel
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d465004.5!2d90.3!3d23.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704532086149!5m2!1sen!2sbd'
            },
            isActive: true
        });
    }

    // If popularCourse section doesn't exist, create default
    if (!design && section === 'popularCourse') {
        design = await Design.create({
            section: 'popularCourse',
            popularCourseContent: {
                badge: {
                    text: 'Popular Courses',
                    textBn: 'জনপ্রিয় কোর্স'
                },
                heading: {
                    text1: 'Explore Our ',
                    text1Bn: 'আমাদের ',
                    highlight: 'Top Courses',
                    highlightBn: 'সেরা কোর্স',
                    text2: '',
                    text2Bn: ' সমূহ'
                },
                description: {
                    text: 'Premium courses crafted by industry experts.',
                    textBn: 'বিশেষজ্ঞ মেন্টরদের দ্বারা তৈরি প্রিমিয়াম কোর্স।'
                },
                cta: {
                    buttonText: 'View All Courses',
                    buttonTextBn: 'সব কোর্স দেখুন',
                    footerText: 'Thousands of learners joined',
                    footerTextBn: 'হাজার হাজার শিক্ষার্থী যোগ দিয়েছেন'
                }
            },
            isActive: true
        });
    }

    // If digitalProducts section doesn't exist, create default
    if (!design && section === 'digitalProducts') {
        design = await Design.create({
            section: 'digitalProducts',
            digitalProductsContent: {
                badge: {
                    text: 'Digital Products',
                    textBn: 'ডিজিটাল পণ্য'
                },
                heading: {
                    text1: 'Premium ',
                    text1Bn: 'আমাদের ',
                    highlight: 'Digital Products',
                    highlightBn: 'প্রিমিয়াম ডিজিটাল পণ্য'
                },
                description: {
                    text: 'Explore our collection of premium software and ready-made websites designed to scale your business.',
                    textBn: 'আমাদের প্রিমিয়াম সফটওয়্যার এবং রেডিমেড ওয়েবসাইট কালেকশন আপনার ব্যবসা বাড়াতে সাহায্য করবে।'
                },
                tabs: {
                    software: 'Software',
                    softwareBn: 'সফটওয়্যার',
                    website: 'Websites',
                    websiteBn: 'ওয়েবসাইট'
                },
                cta: {
                    viewAll: 'View All',
                    viewAllBn: 'সব দেখুন'
                }
            },
            isActive: true
        });
    }

    // If whatWeProvide section doesn't exist, create default
    if (!design && section === 'whatWeProvide') {
        design = await Design.create({
            section: 'whatWeProvide',
            whatWeProvideContent: {
                badge: {
                    text: 'Why Choose Us',
                    textBn: 'কেন আমাদের বেছে নেবেন'
                },
                heading: {
                    text1: 'What We ',
                    text1Bn: 'আমরা যা ',
                    highlight: 'Provide',
                    highlightBn: 'প্রদান করি'
                },
                description: {
                    text: 'We are committed to providing the best learning experience.',
                    textBn: 'আমরা সেরা শেখার অভিজ্ঞতা প্রদান করতে প্রতিশ্রুতিবদ্ধ।'
                },
                features: [
                    { title: 'Lifetime Support', titleBn: 'লাইফটাইম সাপোর্ট', description: 'Get lifetime support for all your purchases.', descriptionBn: 'আপনার সব ক্রয়ের জন্য লাইফটাইম সাপোর্ট পান।', emoji: '🚀' },
                    { title: 'Job Placement', titleBn: 'চাকরি নিশ্চিতকরণ', description: 'We help you get placed in top companies.', descriptionBn: 'আমরা আপনাকে শীর্ষ কোম্পানিতে চাকরি পেতে সাহায্য করি।', emoji: '🎯' },
                    { title: 'Certification', titleBn: 'সার্টিফিকেশন', description: 'Get industry recognized certification.', descriptionBn: 'ইন্ডাস্ট্রি স্বীকৃত সার্টিফিকেট পান।', emoji: '🏅' }
                ],
                cta: {
                    text: 'Learn More About Us',
                    textBn: 'আমাদের সম্পর্কে আরও জানুন'
                }
            },
            isActive: true
        });
    }

    return design;
=======
    return { contactContent: (doc.contactContent || {}) as IContactContent };
>>>>>>> cd51453f7d79d5d78c7c80e636e0922c99bbda03
};

const updateContactContent = async (
    contactContent: IContactContent
): Promise<{ contactContent: IContactContent }> => {
    const doc = await Design.findOneAndUpdate(
        { key: CONTACT_KEY },
        { $set: { contactContent } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return { contactContent: (doc?.contactContent || {}) as IContactContent };
};

// ==================== Home: Hero ====================
const getHeroContent = async (): Promise<{ heroContent: IHeroContent }> => {
    let doc = await Design.findOne({ key: HERO_KEY });
    if (!doc) {
        doc = await Design.create({ key: HERO_KEY, heroContent: {} });
    }
    return { heroContent: (doc.heroContent || {}) as IHeroContent };
};

const updateHeroContent = async (
    heroContent: IHeroContent
): Promise<{ heroContent: IHeroContent }> => {
    const doc = await Design.findOneAndUpdate(
        { key: HERO_KEY },
        { $set: { heroContent } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return { heroContent: (doc?.heroContent || {}) as IHeroContent };
};

// ==================== Home: What We Provide ====================
const getProvideContent = async (): Promise<{ provideContent: IProvideContent }> => {
    let doc = await Design.findOne({ key: PROVIDE_KEY });
    if (!doc) {
        doc = await Design.create({ key: PROVIDE_KEY, provideContent: {} });
    }
    return { provideContent: (doc.provideContent || {}) as IProvideContent };
};

const updateProvideContent = async (
    provideContent: IProvideContent
): Promise<{ provideContent: IProvideContent }> => {
    const doc = await Design.findOneAndUpdate(
        { key: PROVIDE_KEY },
        { $set: { provideContent } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return { provideContent: (doc?.provideContent || {}) as IProvideContent };
};

export const DesignService = {
    getContactContent,
    updateContactContent,
    getHeroContent,
    updateHeroContent,
    getProvideContent,
    updateProvideContent,
};
