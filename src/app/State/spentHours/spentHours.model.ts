export interface Action {
    type: string;
    payload?: SpentHour | SpentHour[];
}

export interface SpentHour {
    hoursUsed: number;
    dayUsed: number;
    prevHours: number;
    afterHours: number;
    isExtraHours: boolean;
}

export type ActionType = "ADD_HOUR" | "SPENT_HOURS" | "RESET_HOURS";