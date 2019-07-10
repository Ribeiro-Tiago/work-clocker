import * as headerActions from "./header.actions";
import { Header, Action } from './header.model';

const initState: Header = {
    showClockBtn: true,
    title: "title"
};

export function HeaderReducer(state: Header = initState, action: Action) {
    const { payload, type } = action;

    switch (type) {
        case headerActions.SET_OPTS: {
            return {
                title: payload.title,
                showClockBtn: payload.showClockBtn || false
            }
        }

        default:
            return state;
    }
}