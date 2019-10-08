import { Tutorial, Action, StageConf } from "./tutorial.model";
import * as tutorialsActions from "./tutorial.actions";

const initState: Tutorial = {
	isVisible: true,
	isLastStage: false,
	isFirstStage: true,
	isDone: false,
	stage: "intro",
	currStage: 0,
	position: "on-intro",
	title: "introTitle"
};

const stages: StageConf[] = [
	{ stage: "intro", title: "introTitle" },
	{ stage: "clockBtn", title: "clockBtnTitle" },
	{ stage: "hours", title: "hoursTitle" },
	{ stage: "menu", title: "menuTitle" },
	{ stage: "clockedHours", title: "clockedHoursTitle" },
	{ stage: "spentHours", title: "spentHoursTitle" },
	{ stage: "settings", title: "settingsTitle" }
];

const getPosition = (stage: number) => {
	switch (stage) {
		case 0: return "on-intro";

		case 1: return "on-button";

		case 2: return "on-hours";

		case 3: return "on-header";

		case 4: return "on-clocked";

		case 5: return "on-spent";

		case 6: return "on-settings";
	}
};

export function TutorialsReducer(state: Tutorial = initState, action: Action) {
	switch (action.type) {
		case tutorialsActions.SET_TUTORIAL: {
			return { ...action.payload };
		}

		case tutorialsActions.NEXT_STAGE: {
			const nextStage = state.currStage + 1;
			const { stage, title } = stages[nextStage];
			const position = getPosition(nextStage);

			return {
				...state,
				stage,
				title,
				position,
				currStage: nextStage,
				isLastStage: nextStage === stages.length - 1,
				isFirstStage: false
			};
		}

		case tutorialsActions.PREV_STAGE: {
			const prevStage = state.currStage - 1;
			const { stage, title } = stages[prevStage];
			const position = getPosition(prevStage);

			return {
				...state,
				title,
				stage,
				position,
				currStage: prevStage,
				isLastStage: false,
				isFirstStage: prevStage === 0,
			};
		}

		case tutorialsActions.FINISH_TUT: {
			return {
				...state,
				isVisible: false,
				isDone: true,
				stage: ""
			};
		}

		case tutorialsActions.SHOW_TUT: {
			return {
				...state,
				isVisible: true
			};
		}

		case tutorialsActions.HIDE_TUT: {
			return {
				...state,
				isVisible: false
			};
		}

		case tutorialsActions.RESET_TUT: {
			return {
				...initState,
				isVisible: true
			};
		}

		default:
			return state;
	}
}