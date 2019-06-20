import { Tutorial, Action, StageConf } from "./tutorial.model";
import * as tutorialsActions from "./tutorial.actions";

const initState: Tutorial = {
    isVisible: true,
    isLastStage: false,
    isFirstStage: true,
    stage: "clockBtn",
    currStage: 0,
    isFinished: false,
    position: "on-header",
    rightOffset: 26
};

const stages: StageConf[] = [
    { stage: "clockBtn", rightOffset: 26 },
    { stage: "hoursBtn", rightOffset: 13 },
    { stage: "settingsBtn", rightOffset: 2 },
    { stage: "owedHours", rightOffset: -1 },
    { stage: "extraHours", rightOffset: 13 },
    { stage: "content", rightOffset: 0 },
];

export function TutorialsReducer(state: Tutorial = initState, action: Action) {
    switch (action.type) {
        case tutorialsActions.SET_TUTORIAL: {
            return {
                ...state,
                ...action.payload
            };
        }

        case tutorialsActions.NEXT_STAGE: {
            const nextStage = state.currStage + 1;
            const { stage, rightOffset } = stages[nextStage];
            const position = (nextStage < 3)
                ? "on-header"
                : (nextStage < 5)
                    ? "on-hours"
                    : "on-body";

            return {
                ...state,
                stage,
                position,
                rightOffset,
                currStage: nextStage,
                isLastStage: nextStage === stages.length - 1,
                isFirstStage: false
            };
        }

        case tutorialsActions.PREV_STAGE: {
            const prevStage = state.currStage - 1;
            const { stage, rightOffset } = stages[prevStage];
            const position = (prevStage < 3)
                ? "on-header"
                : (prevStage < 5)
                    ? "on-hours"
                    : "on-body";

            return {
                ...state,
                stage,
                position,
                rightOffset,
                currStage: prevStage,
                isLastStage: false,
                isFirstStage: prevStage === stages.length - 1
            };
        }

        case tutorialsActions.FINISH_TUT: {
            return {
                ...state,
                isFinished: true,
                isVisible: false,
                stage: ""
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