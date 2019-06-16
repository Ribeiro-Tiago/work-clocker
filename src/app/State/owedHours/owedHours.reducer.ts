import { Action, OwedHour } from "./owedHours.model";
import * as Actions from "./owedHours.actions";

const initState: OwedHour = {
    hours: 0,
    hoursUsed: []
};

export function owedHoursReducer(state: OwedHour = initState, action: Action) {
    switch (action.type) {
        case Actions.ADD_HOURS: {
            return {
                ...state,
                hours: state.hours + (action.payload as number)
            };
        }

        case Actions.SET_HOURS: {
            return { ...action.payload as OwedHour };
        }

        case Actions.UPDATE_HOURS: {
            return {
                ...state,
                hours: action.payload
            };
        }

        case Actions.USE_HOURS: {
            return {
                ...state,
                hoursUsed: [...state.hoursUsed, action.payload]
            };
        }

        case Actions.RESET_HOURS:
            return { ...initState };

        default:
            return state;
    }
}