import { Action } from '@ngrx/store';
import { Setting } from './settings.model';

export const RESET_SETTINGS = "[SETTINGS] Reset settings";
export const UPDATE_SETTINGS = "[SETTINGS] Update settings";

export class Reset implements Action {
    readonly type = RESET_SETTINGS;
}

export class Update implements Action {
    readonly type = UPDATE_SETTINGS;
    constructor(public payload: Setting) { }
}