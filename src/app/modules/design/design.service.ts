import { Design } from './design.model';
import { IContactContent, IHeroContent, IProvideContent } from './design.interface';

const CONTACT_KEY = 'contact';
const HERO_KEY = 'hero';
const PROVIDE_KEY = 'provide';

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
