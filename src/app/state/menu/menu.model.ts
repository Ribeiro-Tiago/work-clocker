export interface Menu {
    isVisible: boolean;
}

export interface Action {
    type: string;
    payload?: Menu;
}