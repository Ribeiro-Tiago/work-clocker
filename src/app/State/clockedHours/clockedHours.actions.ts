import { Action } from '@ngrx/store';

import { ClockedHour } from "./clockedHours.model";

export const ADD_CLOCKED_HOUR = "[CLocked hours] Add clocked hour";
export const UPDATE_CLOCKED_HOUR = "[CLocked hours] Update clocked hour";
export const RESET_CLOCKED_HOURS = "[CLocked hours] Reset clocked hour";

export class AddHour implements Action {
    readonly type = ADD_CLOCKED_HOUR;
    constructor(public payload: ClockedHour) { }
}

export class UpdateHour implements Action {
    readonly type = UPDATE_CLOCKED_HOUR;
    constructor(public payload: ClockedHour) { }
}

export class ResetHours implements Action {
    readonly type = RESET_CLOCKED_HOURS;
}