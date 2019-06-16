import { Action, SpentHour } from "./spentHours.model";
import * as Actions from "./spentHours.actions";

export function spentHoursReducer(state: SpentHour[] = [], action: Action) {
    switch (action.type) {
        case Actions.ADD_HOUR: {
            return [action.payload, ...state];
        }

        case Actions.SET_HOURS: {
            return [...action.payload as SpentHour[]];
        }

        case Actions.RESET_HOURS:
            return [];

        default:
            return state;
    }
}