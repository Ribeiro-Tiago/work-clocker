import { Action } from '@ngrx/store';

import { SpentHour } from "./spentHours.model";

export const SET_HOURS = "[Hours spent] Set hours";
export const ADD_HOUR = "[Hours spent] Add hours";
export const RESET_HOURS = "[Hours spent] Reset hours";

export class SetHours implements Action {
    readonly type = SET_HOURS;
    constructor(public payload: SpentHour[]) { }
}

export class AddHours implements Action {
    readonly type = ADD_HOUR;
    constructor(public payload: SpentHour) { }
}

export class ResetHours implements Action {
    readonly type = RESET_HOURS;
}