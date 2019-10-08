import { Setting, Action } from "./settings.model";
import * as SettingsActions from "./settings.actions";

import configs from "src/app/pages/settings/configs";

const initState: Setting = {
	selectedDateFormat: configs.dateFormats[0],
	selectedLanguage: configs.langs[0],
	selectedLunchType: configs.lunchTypes[0],
	selectedLunchDuration: 60,
	selectedWorkDuration: 8,
	clockinNotif: { ...configs.notifs.defaultTime },
	clockoutNotif: { ...configs.notifs.defaultTime },
	clockinLunchNotif: { ...configs.notifs.defaultTime },
	clockoutLunchNotif: { ...configs.notifs.defaultTime }
};

export function settingsReducer(state: Setting = initState, action: Action) {
	const { type, payload } = action;
	switch (type) {
		case SettingsActions.UPDATE_SETTINGS: {
			return { ...payload };
		}

		case SettingsActions.UPDATE_LANG: {
			return {
				...state,
				selectedLanguage: { ...payload }
			};
		}

		default:
			return state;
	}
}