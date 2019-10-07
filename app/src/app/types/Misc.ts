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

export interface GenericOption {
	label: string;
	value: string;
}

export interface OwedHourModalConf {
	isVisible: boolean;
	isExtra: boolean;
	isPool: boolean;
	owedHours: number;
	extraHours?: number;
	poolHours?: number;
}

export interface FeedBackTopic {
	label: string;
	value: string;
	emailSubject: string;
}