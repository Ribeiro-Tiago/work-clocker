import { Action, OwedHour } from "./owedHours.model";
import * as Actions from "./owedHours.actions";

const initState: OwedHour = {
    hours: 0,
    hoursUsed: []
};

export function owedHoursReducer(state: OwedHour = initState, action: Action) {
    const { type, payload } = action;

    switch (type) {
        case Actions.ADD_HOURS: {
            return {
                ...state,
                hours: state.hours + (payload as number)
            };
        }

        case Actions.SET_HOURS: {
            return { ...payload as OwedHour };
        }

        case Actions.UPDATE_HOURS: {
            return {
                ...state,
                hours: payload
            };
        }

        case Actions.USE_HOURS: {
            return {
                ...state,
                hoursUsed: [...state.hoursUsed, payload]
            };
        }

        case Actions.RESET_HOURS:
            return { ...initState };

        default:
            return state;
    }
}