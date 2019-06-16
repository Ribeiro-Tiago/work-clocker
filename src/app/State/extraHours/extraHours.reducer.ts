import { Action } from "./extraHours.model";
import * as Actions from "./extraHours.actions";

export function extraHoursReducer(state: number = 0, action: Action) {
    switch (action.type) {
        case Actions.ADD_HOURS:
            return state + action.payload;

        case Actions.RESET_HOURS:
            return 0;

        default:
            return state;
    }
}