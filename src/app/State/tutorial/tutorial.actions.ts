import { Action } from '@ngrx/store';
import { Tutorial } from './tutorial.model';

export const SET_TUTORIAL = "[Tutorial] Set tutorial";
export const UPDATE_STAGE = "[Tutorial] Update tutorial";
export const FINISH_TUT = "[Tutorial] Finish tutorial";
export const SHOW_TUT = "[Tutorial] Show tutorial";
export const RESET_TUT = "[Tutorial] Reset tutorial";

export class SetTutorial implements Action {
    readonly type = UPDATE_STAGE;
    constructor(public payload: Tutorial) { }
}

export class UpdateStage implements Action {
    readonly type = UPDATE_STAGE;
    constructor(public payload: number) { }
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