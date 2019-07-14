export interface Header {
    title?: string;
    hideBackBtn?: boolean;
    showHeader: boolean;
}

export interface Action {
    type: string;
    payload?: Header;
}