export interface Tutorial {
    stage: TutorialStage;
    isVisible: boolean;
    isIntroVisible: boolean;
    isFirstStage: boolean;
    isLastStage: boolean;
    currStage: number;
    position: string;
    rightOffset: number;
    title: string;
}

export interface StageConf {
    stage: string;
    title: string;
    rightOffset: number;
}

export interface Action {
    type: string;
    payload?: Tutorial;
}

export type ActionType = "SET_TUT" | "NEXT_STAGE" | "PREV_STAGE" | "FINISH_TUT" | "SHOW_TUT" | "RESET_TUT";

export type TutorialStage = "clockBtn" | "hoursBtn" | "settingsBtn" | "owedHours" | "extraHours" | "content";