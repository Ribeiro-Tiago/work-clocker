import * as menuActions from "./menu.actions";
import { Menu, Action } from './menu.model';

const initState: Menu = {
    isVisible: false
};

export function MenuReducer(state: Menu = initState, action: Action) {
    const { payload, type } = action;

    switch (type) {
        case menuActions.TOGGLE_MENU: {
            return {
                isVisible: !state.isVisible
            };
        }

        case menuActions.SET_MENU: {
            return { ...payload };
        }

        default:
            return state;
    }
}