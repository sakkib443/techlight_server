import { Design } from './design.model';
import { IContactContent } from './design.interface';

const CONTACT_KEY = 'contact';

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

export const DesignService = {
    getContactContent,
    updateContactContent,
};
