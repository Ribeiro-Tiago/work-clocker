export interface ClockedHour {
    day: number;
    startHour: number;
    lunchDuration: number;
    onGoing: boolean;
    hoursWorked?: number;
    endHour?: number;
    lunchStart?: number;
    lunchEnd?: number;
}