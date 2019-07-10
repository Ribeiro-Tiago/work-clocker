import { Action } from '@ngrx/store';

export const TOGGLE_MENU = "[Menu] Toggle menu";
export const CLOSE_MENU = "[Menu] Close menu";

export class ToggleMenu implements Action {
    readonly type = TOGGLE_MENU;
}

export class CloseMenu implements Action {
    readonly type = CLOSE_MENU;
}
