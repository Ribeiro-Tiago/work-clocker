import { Action } from '@ngrx/store';
import { OwedHourItem, OwedHour } from "./owedHours.model";

export const ADD_HOURS = "[Hours owed] Add hours";
export const SET_HOURS = "[Hours owed] Set hours";
export const UPDATE_HOURS = "[Hours owed] Update hours";
export const USE_HOURS = "[Hours owed] Use hours";
export const RESET_HOURS = "[Hours owed] Reset hours";

export class SetHours implements Action {
    readonly type = SET_HOURS;
    constructor(public payload: OwedHour) { }
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
    constructor(public payload: OwedHourItem) { }
}

export class ResetHours implements Action {
    readonly type = RESET_HOURS;
}