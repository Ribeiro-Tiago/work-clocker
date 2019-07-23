import { ConfigOption, NotifOption } from 'src/app/types/Misc';

export interface Setting {
    selectedDateFormat: ConfigOption;
    selectedLanguage: ConfigOption;
    selectedLunchDuration: number;
    selectedWorkDuration: number;
    clockinNotif: NotifOption;
    clockoutNotif: NotifOption;
}

export interface Action {
    type: string;
    payload?: Setting;
}

export type ActionType = "UDPATE_SETTINGS";