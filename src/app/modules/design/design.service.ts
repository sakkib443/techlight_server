import { Design } from './design.model';
import {
    IContactContent,
    IHeroContent,
    IProvideContent,
    IAboutContent,
    IPaymentContent,
    ISeoContent,
} from './design.interface';

const CONTACT_KEY = 'contact';
const HERO_KEY = 'hero';
const PROVIDE_KEY = 'provide';
const ABOUT_KEY = 'about';
const PAYMENT_KEY = 'payment';
const SEO_KEY = 'seo';

// ==================== Contact ====================
const getContactContent = async (): Promise<{ contactContent: IContactContent }> => {
    let doc = await Design.findOne({ key: CONTACT_KEY });
    if (!doc) {
        doc = await Design.create({ key: CONTACT_KEY, contactContent: {} });
    }
    return { contactContent: (doc.contactContent || {}) as IContactContent };
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

const DEFAULT_HERO_BANNER = '/images/bg hero.png';

// ==================== Home: Hero ====================
const getHeroContent = async (): Promise<{ heroContent: IHeroContent }> => {
    let doc = await Design.findOne({ key: HERO_KEY });
    if (!doc) {
        doc = await Design.create({
            key: HERO_KEY,
            heroContent: { bannerImage: DEFAULT_HERO_BANNER },
        });
    }
    const heroContent = (doc.heroContent || {}) as IHeroContent;
    if (!heroContent.bannerImage) {
        heroContent.bannerImage = DEFAULT_HERO_BANNER;
    }
    return { heroContent };
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

// ==================== About Page ====================
const getAboutContent = async (): Promise<{ aboutContent: IAboutContent }> => {
    let doc = await Design.findOne({ key: ABOUT_KEY });
    if (!doc) {
        doc = await Design.create({ key: ABOUT_KEY, aboutContent: {} });
    }
    return { aboutContent: (doc.aboutContent || {}) as IAboutContent };
};

const updateAboutContent = async (
    aboutContent: IAboutContent
): Promise<{ aboutContent: IAboutContent }> => {
    const doc = await Design.findOneAndUpdate(
        { key: ABOUT_KEY },
        { $set: { aboutContent } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return { aboutContent: (doc?.aboutContent || {}) as IAboutContent };
};

// ==================== Payment ====================
const getPaymentContent = async (): Promise<{ paymentContent: IPaymentContent }> => {
    let doc = await Design.findOne({ key: PAYMENT_KEY });
    if (!doc) {
        doc = await Design.create({ key: PAYMENT_KEY, paymentContent: {} });
    }
    return { paymentContent: (doc.paymentContent || {}) as IPaymentContent };
};

const updatePaymentContent = async (
    paymentContent: IPaymentContent
): Promise<{ paymentContent: IPaymentContent }> => {
    const doc = await Design.findOneAndUpdate(
        { key: PAYMENT_KEY },
        { $set: { paymentContent } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return { paymentContent: (doc?.paymentContent || {}) as IPaymentContent };
};

// ==================== SEO ====================
const getSeoContent = async (): Promise<{ seoContent: ISeoContent }> => {
    let doc = await Design.findOne({ key: SEO_KEY });
    if (!doc) {
        doc = await Design.create({ key: SEO_KEY, seoContent: {} });
    }
    return { seoContent: (doc.seoContent || {}) as ISeoContent };
};

const updateSeoContent = async (
    seoContent: ISeoContent
): Promise<{ seoContent: ISeoContent }> => {
    const doc = await Design.findOneAndUpdate(
        { key: SEO_KEY },
        { $set: { seoContent } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return { seoContent: (doc?.seoContent || {}) as ISeoContent };
};

export const DesignService = {
    getContactContent,
    updateContactContent,
    getHeroContent,
    updateHeroContent,
    getProvideContent,
    updateProvideContent,
    getAboutContent,
    updateAboutContent,
    getPaymentContent,
    updatePaymentContent,
    getSeoContent,
    updateSeoContent,
};
