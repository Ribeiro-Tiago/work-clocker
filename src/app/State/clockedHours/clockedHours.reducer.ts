import { Action } from "./clockedHours.model";
import * as Actions from "./clockedHours.actions";
import { ClockedHour } from './clockedHours.model';

const initState: ClockedHour = {
    hours: [],
    isActive: false
};

export function clockedHoursReducer(state: ClockedHour = initState, action: Action) {
    switch (action.type) {
        case Actions.ADD_CLOCKED_HOUR: {
            return {
                hours: [...state.hours, action.payload],
                isActive: true
            };
        }

        case Actions.UPDATE_CLOCKED_HOUR: {
            return { ...action.payload };
        }

        case Actions.RESET_CLOCKED_HOURS:
            return initState;

        default:
            return state;
    }
}