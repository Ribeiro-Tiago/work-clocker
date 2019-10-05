import { Action } from "./clockedHours.model";
import * as Actions from "./clockedHours.actions";
import { ClockedHour } from './clockedHours.model';

const initState: ClockedHour = {
    hours: [],
    isActive: false
};

export function clockedHoursReducer(state: ClockedHour = initState, action: Action) {
    const { payload, type } = action;

    switch (type) {
        case Actions.ADD_CLOCKED_HOUR: {
            return {
                hours: [payload, ...state.hours],
                isActive: true
            };
        }

        case Actions.SET_CLOCKED_HOURS:
        case Actions.UPDATE_CLOCKED_HOUR: {
            return { ...payload };
        }

        case Actions.RESET_CLOCKED_HOURS:
            return initState;

        case Actions.CLOCK_OUT_LUNCH: {
            const hours = [...state.hours];

            hours[0].status = 2;
            hours[0].lunchOutAt = Date.now();

            return { isActive: true, hours }
        }

        case Actions.CLOCK_IN_LUNCH: {
            const hours = [...state.hours];
            const now = Date.now()

            hours[0].status = 3;
            hours[0].lunchInAt = now;
            hours[0].lunchDuration = Math.floor((now - hours[0].lunchOutAt) / 60000);

            return { isActive: true, hours }
        }

        default:
            return state;
    }
}