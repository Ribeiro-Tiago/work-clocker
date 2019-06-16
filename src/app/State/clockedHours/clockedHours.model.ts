import { ClockedHour as Item } from 'src/app/types/Hour';

export interface Action {
    type: string;
    payload?: ClockedHour;
}

export interface ClockedHour {
    hours: Item[];
    isActive: boolean;
}

export type ActionType = "ADD_HOURS" | "RESET_HOURS";