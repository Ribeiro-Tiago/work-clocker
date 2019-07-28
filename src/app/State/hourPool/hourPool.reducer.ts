import { HourPool, Action } from "./hourPool.model";
import * as hourPoolActions from "./hourPool.actions";

const initState: HourPool = { hasPool: false };

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

        default:
            return state;
    }
}