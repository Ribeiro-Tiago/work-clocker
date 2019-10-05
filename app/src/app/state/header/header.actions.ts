import { Action } from '@ngrx/store';
import { Header } from './header.model';

export const SET_OPTS = "[Header] Set opts";

export class SetOptions implements Action {
    readonly type = SET_OPTS;
    constructor(public payload: Header) { }
}
