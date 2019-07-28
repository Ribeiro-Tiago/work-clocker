import { Action } from '@ngrx/store';
import { HourPool } from './hourPool.model';

export const SET_POOL = "[Pool] Set Pool";
export const UPDATE_VALUE = "[Pool] Update Value";
export const UPDATE_TYPE = "[Pool] Update Type";
export const TOGGLE_POOL = "[Pool] Toggle Pool";

export class SetPool implements Action {
    readonly type = SET_POOL;
    constructor(public payload: HourPool) { }
}

export class UpdateValue implements Action {
    readonly type = UPDATE_VALUE;
    constructor(public payload: number) { }
}

export class UpdateType implements Action {
    readonly type = UPDATE_TYPE;
}

export class TooglePool implements Action {
    readonly type = TOGGLE_POOL;
}
