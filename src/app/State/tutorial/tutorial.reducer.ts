import { Tutorial, Action, StageConf } from "./tutorial.model";
import * as tutorialsActions from "./tutorial.actions";

const initState: Tutorial = {
    isVisible: true,
    isLastStage: false,
    isFirstStage: true,
    stage: "clockBtn",
    currStage: 0,
    isIntroVisible: true,
    position: "on-header",
    rightOffset: 26,
    title: "clockBtnTitle"
};

const stages: StageConf[] = [
    { stage: "clockBtn", rightOffset: 26, title: "clockBtnTitle" },
    { stage: "hoursBtn", rightOffset: 13, title: "hoursBtnTitle" },
    { stage: "settingsBtn", rightOffset: 2, title: "settingsBtnTitle" },
    { stage: "owedHours", rightOffset: -1, title: "owedHoursTitle" },
    { stage: "extraHours", rightOffset: 13, title: "extraHoursTitle" },
    { stage: "content", rightOffset: 0, title: "contentTitle" },
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
            const { stage, rightOffset, title } = stages[nextStage];
            const position = (nextStage < 3)
                ? "on-header"
                : (nextStage < 5)
                    ? "on-hours"
                    : "on-body";

            return {
                ...state,
                stage,
                title,
                position,
                rightOffset,
                currStage: nextStage,
                isLastStage: nextStage === stages.length - 1,
                isFirstStage: false
            };
        }

        case tutorialsActions.PREV_STAGE: {
            const prevStage = state.currStage - 1;
            const { stage, rightOffset, title } = stages[prevStage];
            const position = (prevStage < 3)
                ? "on-header"
                : (prevStage < 5)
                    ? "on-hours"
                    : "on-body";

            return {
                ...state,
                title,
                stage,
                position,
                rightOffset,
                currStage: prevStage,
                isLastStage: false,
                isFirstStage: prevStage === 0,
            };
        }

        case tutorialsActions.FINISH_TUT: {
            return {
                ...state,
                isIntroVisible: true,
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
            return {
                ...state,
                ...initState
            };
        }

        case tutorialsActions.READ_INTRO: {
            return {
                ...state,
                isIntroVisible: false
            };
        }

        default:
            return state;
    }
}