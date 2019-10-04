import * as headerActions from "./header.actions";
import { Header, Action } from './header.model';

const initState: Header = {
    hideBackBtn: true,
    showHeader: false,
    title: "title"
};

export function HeaderReducer(state: Header = initState, action: Action) {
    const { payload, type } = action;

    switch (type) {
        case headerActions.SET_OPTS: {
            return { ...payload };
        }

        default:
            return state;
    }
}