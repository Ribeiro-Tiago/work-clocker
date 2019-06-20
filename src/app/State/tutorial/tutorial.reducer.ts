import { Tutorial, Action } from "./tutorial.model";
import * as tutorialsActions from "./tutorial.actions";

const initState: Tutorial = {
    isVisible: true,
    isLastStage: false,
    isFirstStage: true,
    stage: "clockBtn",
    currStage: 0,
    isFinished: false,
    position: "on-header"
};

const stages = [
    "clockBtn",
    "hoursBtn",
    "settingsBtn"
];


export function TutorialsReducer(state: Tutorial = initState, action: Action) {
    switch (action.type) {
        case tutorialsActions.SET_TUTORIAL: {
            return { ...action.payload };
        }

        case tutorialsActions.NEXT_STAGE: {
            const nextStage = state.currStage + 1;
            const position = (nextStage < 3)
                ? "on-header"
                : "body";

            return {
                ...state,
                stage: stages[nextStage],
                currStage: nextStage,
                isLastStage: nextStage === stages.length - 1,
                position,
                isFirstStage: false
            };
        }

        case tutorialsActions.PREV_STAGE: {
            const prevStage = state.currStage - 1;
            const position = (prevStage < 3)
                ? "on-header"
                : "body";

            return {
                ...state,
                stage: stages[prevStage],
                currStage: prevStage,
                isLastStage: false,
                position,
                isFirstStage: prevStage === stages.length - 1
            };
        }

        case tutorialsActions.FINISH_TUT: {
            return {
                ...state,
                isFinished: true,
                isVisible: false
            };
        }

        case tutorialsActions.SHOW_TUT: {
            return {
                ...state,
                isVisible: true
            };
        }

        case tutorialsActions.RESET_TUT: {
            return { ...initState };
        }

        default:
            return state;
    }
}