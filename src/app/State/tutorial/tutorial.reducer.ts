import { Tutorial, Action } from "./tutorial.model";
import * as tutorialsActions from "./tutorial.actions";

const initState: Tutorial = {
    isVisible: true,
    stage: "clockBtn",
    isFinished: false
};

export function TutorialsReducer(state: Tutorial = initState, action: Action) {
    switch (action.type) {
        case tutorialsActions.SET_TUTORIAL: {
            return { ...action.payload };
        }

        case tutorialsActions.UPDATE_STAGE: {
            return {
                ...state,
                stage: action.payload
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