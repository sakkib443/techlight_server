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

// ==================== Home: Hero Section ====================
export interface IHeroStat {
    value?: string;
    label?: string;
}

export interface IHeroContent {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    stats?: IHeroStat[];
}

// ==================== Home: What We Provide Section ====================
export interface IProvideFeature {
    title?: string;
    desc?: string;
}

export interface IProvideContent {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    features?: IProvideFeature[];
}

// ==================== About Page ====================
// Stored as a flexible object (single-language / English). Shape is mirrored
// by the admin editor and the public About page defaults.
export type IAboutContent = Record<string, unknown>;

export interface IPaymentContent {
    bkash?: string;
    rocket?: string;
    nagad?: string;
    note?: string;
}

export interface IDesign {
    key: string; // e.g. 'contact' | 'hero' | 'provide' | 'about' | 'payment'
    contactContent?: IContactContent;
    heroContent?: IHeroContent;
    provideContent?: IProvideContent;
    aboutContent?: IAboutContent;
    paymentContent?: IPaymentContent;
}
