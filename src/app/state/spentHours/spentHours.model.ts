export interface Action {
    type: string;
    payload?: SpentHour | SpentHour[];
}

export interface SpentHour {
    hours: number;
    day: number;
    prevHours: number;
    afterHours: number;
}

export type ActionType = "ADD_HOUR" | "SPENT_HOURS" | "RESET_HOURS";