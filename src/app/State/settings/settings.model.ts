import { ConfigOption } from 'src/app/types/Misc';

export interface Setting {
    selectedDateFormat: ConfigOption;
    selectedLanguage: ConfigOption;
    selectedLunchDuration: number;
    selectedWorkDuration: number;
}

export interface Action {
    type: string;
    payload?: Setting;
}

export type ActionType = "UDPATE_SETTINGS";