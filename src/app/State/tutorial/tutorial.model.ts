export interface Tutorial {
    stage: TutorialStage;
    isVisible: boolean;
    isFinished: boolean;
    isFirstStage: boolean;
    isLastStage: boolean;
    currStage: number;
    position: string;
}

export interface Action {
    type: string;
    payload?: Tutorial;
}

export type ActionType = "SET_TUT" | "NEXT_STAGE" | "PREV_STAGE" | "FINISH_TUT" | "SHOW_TUT" | "RESET_TUT";

export type TutorialStage = "clockBtn" | "hoursBtn" | "settingsBtn";