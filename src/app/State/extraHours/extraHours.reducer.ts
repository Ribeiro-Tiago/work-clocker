import { ExtraHours, Action } from "./extraHours.model";
import * as Actions from "./extraHours.actions";

const defaultState: ExtraHours = {
    extraHours: 0
};

export function extraHoursReducer(state: ExtraHours = defaultState, action: Action) {
    switch (action.type) {
        case Actions.ADD_HOURS:
            return { extraHours: state.extraHours + action.payload };

        case Actions.RESET_HOURS:
            return { ...defaultState };

        default:
            return state;
    }
}