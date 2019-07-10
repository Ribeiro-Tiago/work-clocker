import * as headerActions from "./header.actions";
import { Header, Action } from './header.model';

const initState: Header = {
    showClockBtn: true,
    hideBackBtn: true,
    title: "title"
};

export function HeaderReducer(state: Header = initState, action: Action) {
    const { payload, type } = action;

    switch (type) {
        case headerActions.SET_OPTS: {
            const { title, showClockBtn, hideBackBtn } = payload;

            return {
                title: title,
                showClockBtn: showClockBtn,
                hideBackBtn: hideBackBtn,
            }
        }

        default:
            return state;
    }
}