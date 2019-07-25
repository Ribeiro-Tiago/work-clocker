export interface Notification {
    hasPerms: boolean;
}

export interface Action {
    type: string;
    payload?: Notification;
}