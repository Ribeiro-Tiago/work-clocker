import { Action } from '@ngrx/store';

export const ADD_HOURS = "[Hours extra] Add hours";
export const RESET_HOURS = "[Hours extra] Reset hours";

export class AddHours implements Action {
    readonly type = ADD_HOURS;
    constructor(public payload: number) { }
}

export class ResetHours implements Action {
    readonly type = RESET_HOURS;
}