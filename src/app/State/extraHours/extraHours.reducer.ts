import { Action, ExtraHour } from "./extraHours.model";
import * as Actions from "./extraHours.actions";

const initState: ExtraHour = {
    hours: 1800,
    hoursUsed: []
};

export function extraHoursReducer(state: ExtraHour = initState, action: Action) {
    switch (action.type) {
        case Actions.ADD_HOURS: {
            return {
                ...state,
                hours: state.hours + (action.payload as number)
            };
        }

        case Actions.SET_HOURS: {
            return { ...action.payload as ExtraHour };
        }

        case Actions.UPDATE_HOURS: {
            return {
                ...state,
                hours: action.payload
            };
        }

        case Actions.USE_HOURS: {
            console.log(action);

            return {
                ...state,
                hoursUsed: [action.payload, ...state.hoursUsed]
            };
        }

        case Actions.RESET_HOURS:
            return { ...initState };

        default:
            return state;
    }
}