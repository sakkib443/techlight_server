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

export interface IHeroContent {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
}

export interface IMissionFeature {
    title?: string;
    desc?: string;
}

export interface IMissionContent {
    badge?: string;
    titleLine1?: string;
    titleHighlight?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    features?: IMissionFeature[];
}

export interface IHomeContent {
    hero?: IHeroContent;
    mission?: IMissionContent;
}

export interface IDesign {
    key: string; // e.g. 'contact' | 'home'
    contactContent?: IContactContent;
    homeContent?: IHomeContent;
}
