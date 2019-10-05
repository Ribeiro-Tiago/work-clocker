import { HourPool, Action } from "./hourPool.model";
import * as hourPoolActions from "./hourPool.actions";

const initState: HourPool = {
    hasPool: false,
    poolType: "monthly",
    poolValue: 60,
    hoursLeft: 60
};

export function HourPoolReducer(state: HourPool = initState, action: Action) {
    const { type, payload } = action;

    switch (type) {
        case hourPoolActions.SET_POOL: {
            return { ...payload };
        }

        case hourPoolActions.UPDATE_VALUE: {
            return {
                ...state,
                poolValue: payload
            };
        }

        case hourPoolActions.UPDATE_HOURS_LEFT: {
            return {
                ...state,
                hoursLeft: payload
            };
        }

        case hourPoolActions.UPDATE_TYPE: {
            return {
                ...state,
                poolType: payload
            };
        }

        case hourPoolActions.TOGGLE_POOL: {
            return {
                ...state,
                hasPool: !state.hasPool
            };
        }

        case hourPoolActions.RESET_POOL: {
            return { ...initState };
        }

        default:
            return state;
    }
}