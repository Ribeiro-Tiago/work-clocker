import { Action } from "./owedHours.model";
import * as Actions from "./owedHours.actions";

export function owedHoursReducer(state: number = 0, action: Action) {
    switch (action.type) {
        case Actions.ADD_HOURS:
            return state + action.payload;

        case Actions.RESET_HOURS:
            return 0;

        default:
            return state;
    }
}