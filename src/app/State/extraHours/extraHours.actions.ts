import { Action } from '@ngrx/store';
import { ExtraHourItem, ExtraHour } from "./extraHours.model";

export const SET_HOURS = "[Hours extra] Set hours";
export const ADD_HOURS = "[Hours extra] Add hours";
export const UPDATE_HOURS = "[Hours extra] Update hours";
export const USE_HOURS = "[Hours extra] Use hours";
export const RESET_HOURS = "[Hours extra] Reset hours";

export class SetHours implements Action {
    readonly type = SET_HOURS;
    constructor(public payload: ExtraHour) { }
}

export class AddHours implements Action {
    readonly type = ADD_HOURS;
    constructor(public payload: number) { }
}

export class UpdateHours implements Action {
    readonly type = UPDATE_HOURS;
    constructor(public payload: number) { }
}

export class UseHours implements Action {
    readonly type = USE_HOURS;
    constructor(public payload: ExtraHourItem) { }
}

export class ResetHours implements Action {
    readonly type = RESET_HOURS;
}