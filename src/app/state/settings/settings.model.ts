import { ConfigOption, NotifOption, GenericOption } from "src/app/types/Misc";

export interface Setting {
	selectedDateFormat: ConfigOption;
	selectedLanguage: ConfigOption;
	selectedLunchDuration: number;
	selectedLunchType: GenericOption;
	selectedWorkDuration: number;
	clockinNotif?: NotifOption;
	clockoutNotif?: NotifOption;
	clockoutLunchNotif?: NotifOption;
	clockinLunchNotif?: NotifOption;
}

export interface Action {
	type: string;
	payload?: Setting;
}

export type ActionType = "UDPATE_SETTINGS";
