import { Action } from '@ngrx/store';

import { OwedHours } from './owedHours.model';

export const ADD_HOURS = "[Hours owed] Add hours";
export const RESET_HOURS = "[Hours owed] Reset hours";

export class AddHours implements Action {
    readonly type = ADD_HOURS;
    constructor(public payload: OwedHours) { }
}

export class ResetHours implements Action {
    readonly type = RESET_HOURS;
}