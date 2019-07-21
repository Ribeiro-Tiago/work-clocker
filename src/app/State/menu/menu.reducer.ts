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

        case menuActions.CLOSE_MENU: {
            return { isVisible: false };
        }

        case menuActions.OPEN_MENU: {
            return { isVisible: true };
        }

        default:
            return state;
    }
}