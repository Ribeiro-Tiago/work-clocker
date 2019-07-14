import { Action } from '@ngrx/store';
import { Intro } from './intro.model';

export const SET_OPTS = "[Intro] Set opts";

export class SetOptions implements Action {
    readonly type = SET_OPTS;
    constructor(public payload: Intro) { }
}
