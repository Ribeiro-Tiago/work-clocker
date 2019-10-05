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

export type ActionType = "SET_HOURS" | "ADD_HOURS" | "UPDATE_HOURS" | "USE_HOURS" | "RESET_HOURS";