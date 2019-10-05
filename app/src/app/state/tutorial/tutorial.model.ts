export interface Tutorial {
    stage: TutorialStage;
    isVisible: boolean;
    isFirstStage: boolean;
    isLastStage: boolean;
    isDone: boolean;
    currStage: number;
    position: string;
    title: string;
}

export interface StageConf {
    stage: string;
    title: string;
}

export interface Action {
    type: string;
    payload?: Tutorial;
}

export type ActionType = "SET_TUT" | "NEXT_STAGE" | "PREV_STAGE" | "FINISH_TUT" | "SHOW_TUT" | "RESET_TUT";

export type TutorialStage = "intro" | "clockBtn" | "hours" | "menu" | "clockedHours" | "spentHours" | "settings";