import { Action } from '@ngrx/store';
import { Setting } from './settings.model';

export const UPDATE_SETTINGS = "[SETTINGS] Update settings";

export class Update implements Action {
    readonly type = UPDATE_SETTINGS;
    constructor(public payload: Setting) { }
}