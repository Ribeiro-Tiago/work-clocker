import { Action } from '@ngrx/store';
import { Menu } from './menu.model';

export const TOGGLE_MENU = "[Menu] Toggle menu";
export const SET_MENU = "[Menu] Set menu";

export class ToggleMenu implements Action {
    readonly type = TOGGLE_MENU;
}

export class SetMenu implements Action {
    readonly type = SET_MENU;
    constructor(public payload: Menu) { }
}
