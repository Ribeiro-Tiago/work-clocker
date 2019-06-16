import { Action } from '@ngrx/store';

import { ClockedHour } from "./clockedHours.model";
import { ClockedHour as ClockedHourItem } from "../../types/Hour";

export const ADD_CLOCKED_HOUR = "[CLocked hours] Add clocked hour";
export const UPDATE_CLOCKED_HOUR = "[CLocked hours] Update clocked hour";
export const RESET_CLOCKED_HOURS = "[CLocked hours] Reset clocked hour";

export class SetHours implements Action {
    readonly type = ADD_CLOCKED_HOUR;
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