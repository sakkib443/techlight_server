export interface IContactContent {
    hero?: {
        badge?: string;
        badgeBn?: string;
        title1?: string;
        title1Bn?: string;
        title2?: string;
        title2Bn?: string;
        subtitle?: string;
        subtitleBn?: string;
    };
    contactInfo?: {
        email?: string;
        phone?: string;
        address?: string;
        addressBn?: string;
        officeHours?: string;
        officeHoursBn?: string;
    };
    socialLinks?: {
        facebook?: string;
        youtube?: string;
        linkedin?: string;
        whatsapp?: string;
        instagram?: string;
    };
    whatsappSection?: {
        title?: string;
        titleBn?: string;
        description?: string;
        descriptionBn?: string;
        buttonText?: string;
        buttonTextBn?: string;
    };
    mapEmbedUrl?: string;
}

export interface IDesign {
    key: string; // e.g. 'contact'
    contactContent?: IContactContent;
}
