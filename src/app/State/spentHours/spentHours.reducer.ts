import { Action, SpentHour } from "./spentHours.model";
import * as Actions from "./spentHours.actions";

const initState = [/* {
    hours: 120,
    day: Date.now(),
    prevHours: 240,
    afterHours: 120
}, {
    hours: 60,
    day: Date.now(),
    prevHours: 90,
    afterHours: 30
} */];

export function spentHoursReducer(state: SpentHour[] = initState, action: Action) {
    switch (action.type) {
        case Actions.ADD_HOUR: {
            return [action.payload, ...state];
        }

        case Actions.SET_HOURS: {
            return [...action.payload as SpentHour[]];
        }

        case Actions.RESET_HOURS:
            return [...initState];

        default:
            return state;
    }
}