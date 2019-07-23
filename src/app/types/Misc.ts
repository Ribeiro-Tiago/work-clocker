export interface ConfigOption {
    label: string;
    hour?: string;
    key: string;
}

export interface LegalOption {
    labelId: string;
    link?: string;
    version?: string;
}

export interface LangItem {
    icon: string;
    label: string;
    key: string;
}

export interface NotifOption {
    enabled: boolean;
    time: string;
}