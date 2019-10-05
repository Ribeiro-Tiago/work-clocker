import { Action } from '@ngrx/store';

import { ClockedHour, ClockedHourItem } from "./clockedHours.model";

export const ADD_CLOCKED_HOUR = "[Clocked hours] Add clocked hour";
export const SET_CLOCKED_HOURS = "[Clocked hours] Set clocked hours";
export const UPDATE_CLOCKED_HOUR = "[Clocked hours] Update clocked hour";
export const RESET_CLOCKED_HOURS = "[Clocked hours] Reset clocked hour";
export const CLOCK_OUT_LUNCH = "[Clocked hours] Clock out lunch";
export const CLOCK_IN_LUNCH = "[Clocked hours] Clock in lunch";

export class SetHours implements Action {
    readonly type = SET_CLOCKED_HOURS;
    constructor(public payload: ClockedHour) { }
}

export class AddHour implements Action {
    readonly type = ADD_CLOCKED_HOUR;
    constructor(public payload: ClockedHourItem) { }
}

export class UpdateHours implements Action {
    readonly type = UPDATE_CLOCKED_HOUR;
    constructor(public payload: ClockedHour) { }
}

export class ResetHours implements Action {
    readonly type = RESET_CLOCKED_HOURS;
}

export class ClockoutLunch implements Action {
    readonly type = CLOCK_OUT_LUNCH;
}

export class ClockinLunch implements Action {
    readonly type = CLOCK_IN_LUNCH;
}
