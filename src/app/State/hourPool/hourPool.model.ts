export interface HourPool {
    hasPool: boolean;
    poolValue?: number;
    poolType?: PoolType;
}

export interface Action {
    type: string;
    payload?: HourPool;
}

export type PoolType = "monthly" | "yearly";