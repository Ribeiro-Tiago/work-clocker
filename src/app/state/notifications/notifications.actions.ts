import { Action } from '@ngrx/store';
import { Notification } from "./notifications.model";

export const SET_PERMS = "[Notifications] Set perms";

export class SetPerms implements Action {
    readonly type = SET_PERMS;
    constructor(public payload: Notification) { }
}