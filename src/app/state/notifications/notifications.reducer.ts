import * as NotificationActions from "./notifications.actions";
import { Notification, Action } from './notifications.model';

const initState: Notification = {
    hasPerms: false
};

export function NotificationReducer(state: Notification = initState, action: Action) {
    const { payload, type } = action;

    switch (type) {
        case NotificationActions.SET_PERMS: {
            return { ...payload };
        }

        default:
            return state;
    }
}