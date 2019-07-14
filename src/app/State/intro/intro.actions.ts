import { Action } from '@ngrx/store';
import { Intro } from './intro.model';

export const SET_INTRO = "[Intro] Set intro";

export class SetIntro implements Action {
    readonly type = SET_INTRO;
    constructor(public payload: boolean) { }
}

