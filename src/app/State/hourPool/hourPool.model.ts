export interface HourPool {
    hasPool: boolean;
    poolValue?: number;
    isPoolMonthly?: boolean;
}

export interface Action {
    type: string;
    payload?: HourPool;
}
