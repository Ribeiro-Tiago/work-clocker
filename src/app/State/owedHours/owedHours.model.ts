export interface Action {
    type: string;
    payload?: number;
}

export type ActionType = "ADD_HOURS" | "RESET_HOURS";