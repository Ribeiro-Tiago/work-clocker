export interface Tutorial {
    stage: TutorialStage;
    isVisible: boolean;
    isFinished: boolean;
}

export interface Action {
    type: string;
    payload?: Tutorial;
}

export type ActionType = "SET_TUT" | "UPDATE_STAGE" | "FINISH_TUT" | "SHOW_TUT" | "RESET_TUT";

export type TutorialStage = "clockBtn" | "hoursBtn" | "settingsBtn";