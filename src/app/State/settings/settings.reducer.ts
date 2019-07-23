import { Setting, Action } from "./settings.model";
import * as SettingsActions from "./settings.actions";

import configs from "src/app/pages/settings/configs";

const initState: Setting = {
    selectedDateFormat: configs.dateFormats[0],
    selectedLanguage: configs.langs[0],
    selectedLunchDuration: Number(configs.lunchDuration),
    selectedWorkDuration: Number(configs.workDuration),
    clockinNotif: { ...configs.clockNotif },
    clockoutNotif: { ...configs.clockNotif }
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