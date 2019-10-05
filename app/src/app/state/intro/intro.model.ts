export interface Intro {
    isDone: boolean;
}

export interface Action {
    type: string;
    payload?: Intro;
}