export interface Action {
    type: string;
    payload?: ClockedHour;
}

export interface ClockedHourItem {
    day: number; // timestamp
    startHour: number; // timestamp
    lunchDuration: number; // minutes
    // status: number; // 1 - clock in; 2 - enter lunch; 3 - return lunch; 4 - clock out
    // isActive: boolean;
    timeWorked?: number; // time worked in minutes
    endHour?: number; // timestamp
    lunchStart?: number;
    lunchEnd?: number;
}

export interface ClockedHour {
    hours: ClockedHourItem[];
    isActive: boolean;
}

export type ActionType = "ADD_HOURS" | "RESET_HOURS";