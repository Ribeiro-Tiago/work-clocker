import { Setting, Action } from "./settings.model";
import * as SettingsActions from "./settings.actions";

const initState: Setting = {
    selectedDateFormat: { key: "dd/mm/yyyy", label: "21/03/2018" },
    selectedLanguage: { key: "en_US", label: "English (US)" },
    selectedLunchDuration: 60,
    selectedWorkDuration: 8
};

export function settingsReducer(state: Setting = initState, action: Action) {
    switch (action.type) {
        case SettingsActions.UPDATE_SETTINGS:
            return { ...action.payload };

        default:
            return state;
    }
}