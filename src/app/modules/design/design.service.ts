import { Design } from './design.model';
import { IContactContent, IHomeContent } from './design.interface';

const CONTACT_KEY = 'contact';
const HOME_KEY = 'home';

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

const getHomeContent = async (): Promise<{ homeContent: IHomeContent }> => {
    let doc = await Design.findOne({ key: HOME_KEY });
    if (!doc) {
        doc = await Design.create({ key: HOME_KEY, homeContent: {} });
    }
    return { homeContent: (doc.homeContent || {}) as IHomeContent };
};

const updateHomeContent = async (
    homeContent: IHomeContent
): Promise<{ homeContent: IHomeContent }> => {
    const doc = await Design.findOneAndUpdate(
        { key: HOME_KEY },
        { $set: { homeContent } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return { homeContent: (doc?.homeContent || {}) as IHomeContent };
};

export const DesignService = {
    getContactContent,
    updateContactContent,
    getHomeContent,
    updateHomeContent,
};
