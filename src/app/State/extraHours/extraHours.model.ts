export interface Action {
    type: string;
    payload?: number | ExtraHourItem | ExtraHour;
}

export interface ExtraHourItem {
    hoursUsed: number;
    dayUsed: number;
}

export interface ExtraHour {
    hours: number;
    hoursUsed: ExtraHourItem[];
}

export type ActionType = "ADD_HOURS" | "RESET_HOURS";