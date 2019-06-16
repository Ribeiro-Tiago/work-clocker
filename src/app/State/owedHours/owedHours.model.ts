export interface Action {
    type: string;
    payload?: number | OwedHourItem | OwedHour;
}

export interface OwedHourItem {
    hoursUsed: number;
    dayUsed: number;
}

export interface OwedHour {
    hours: number;
    hoursUsed: OwedHourItem[];
}

export type ActionType = "ADD_HOURS" | "RESET_HOURS";