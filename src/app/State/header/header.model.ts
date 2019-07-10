export interface Header {
    title: string;
    showClockBtn?: boolean;
}

export interface Action {
    type: string;
    payload?: Header;
}