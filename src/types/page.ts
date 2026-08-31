export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text' | 'experience';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}

export interface ExperienceItem {
    title: string;
    organization: string;
    organizationUrl?: string;
    date?: string;
    location?: string;
    description?: string;
    advisor?: string;
    advisorLabel?: string;
    advisorUrl?: string;
    researchFocus?: string;
    researchFocusLabel?: string;
    image?: string;
    imageAlt?: string;
    imageMode?: 'contain' | 'wordmark' | 'crop-left';
    kind?: 'education' | 'work';
}

export interface ExperienceSection {
    title: string;
    items: ExperienceItem[];
}

export interface ExperiencePageConfig extends BasePageConfig {
    type: 'experience';
    eyebrow?: string;
    sections: ExperienceSection[];
}
