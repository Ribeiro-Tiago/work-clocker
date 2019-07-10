export interface Header {
    title: string;
    showClockBtn?: boolean;
    hideBackBtn?: boolean;
}

export interface Action {
    type: string;
    payload?: Header;
}