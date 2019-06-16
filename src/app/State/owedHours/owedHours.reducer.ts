import { OwedHours, Action } from "./owedHours.model";
import * as Actions from "./owedHours.actions";

const defaultState: OwedHours = {
    owedHours: 0
};

export function owedHoursReducer(state: OwedHours = defaultState, action: Action) {
    switch (action.type) {
        case Actions.ADD_HOURS:
            return { owedHours: state.owedHours + action.payload };

        case Actions.RESET_HOURS:
            return { ...defaultState };

        default:
            return state;
    }
}