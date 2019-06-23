import { Action } from '@ngrx/store';
import { Tutorial } from './tutorial.model';

export const SET_TUTORIAL = "[Tutorial] Set tutorial";
export const NEXT_STAGE = "[Tutorial] Next tutorial";
export const PREV_STAGE = "[Tutorial] Previous tutorial";
export const FINISH_TUT = "[Tutorial] Finish tutorial";
export const SHOW_TUT = "[Tutorial] Show tutorial";
export const RESET_TUT = "[Tutorial] Reset tutorial";
export const READ_INTRO = "[Tutorial] Read intro";

export class SetTutorial implements Action {
    readonly type = SET_TUTORIAL;
    constructor(public payload: Tutorial) { }
}

export class NextStage implements Action {
    readonly type = NEXT_STAGE;
}

export class PrevStage implements Action {
    readonly type = PREV_STAGE;
}

export class FinishTut implements Action {
    readonly type = FINISH_TUT;
}

export class ShowTut implements Action {
    readonly type = SHOW_TUT;
}

export class Reset implements Action {
    readonly type = RESET_TUT;
}

export class ReadIntro implements Action {
    readonly type = READ_INTRO;
}