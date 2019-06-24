export interface ClockedHour {
    day: number; // timestamp
    startHour: number; // timestamp
    lunchDuration: number; // minutes
    // status: number; // 1 - clock in; 2 - enter lunch; 3 - return lunch; 4 - clock out
    isActive: boolean;
    timeWorked?: number; // time worked in minutes
    endHour?: number; // timestamp
    lunchStart?: number;
    lunchEnd?: number;
}