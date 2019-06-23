import { Tutorial, Action, StageConf } from "./tutorial.model";
import * as tutorialsActions from "./tutorial.actions";

const initState: Tutorial = {
    isVisible: true,
    isLastStage: false,
    isFirstStage: true,
    stage: "intro",
    currStage: 0,
    position: "on-intro",
    rightOffset: 0,
    title: "introTitle"
};

const stages: StageConf[] = [
    { stage: "intro", rightOffset: 0, title: "introTitle" },
    { stage: "clockBtn", rightOffset: 26, title: "clockBtnTitle" },
    { stage: "hoursBtn", rightOffset: 13, title: "hoursBtnTitle" },
    { stage: "settingsBtn", rightOffset: 2, title: "settingsBtnTitle" },
    { stage: "owedHours", rightOffset: -1, title: "owedHoursTitle" },
    { stage: "extraHours", rightOffset: 13, title: "extraHoursTitle" },
    { stage: "content", rightOffset: 0, title: "contentTitle" },
];

const getPosition = (stage: number) => {
    if (stage === 0) {
        return "on-intro";
    }

    if (stage < 3) {
        return "on-header";
    }

    if (stage < 5) {
        return "on-hours";
    }

    return "on-body";
};

export function TutorialsReducer(state: Tutorial = initState, action: Action) {
    switch (action.type) {
        case tutorialsActions.SET_TUTORIAL: {
            return { ...action.payload };
        }

        case tutorialsActions.NEXT_STAGE: {
            const nextStage = state.currStage + 1;
            const { stage, rightOffset, title } = stages[nextStage];
            const position = getPosition(nextStage);

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
            const position = getPosition(prevStage);

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

        default:
            return state;
    }
}