import { Action } from '@ngrx/store';

import { Setting } from "./settings.model";
import * as SettingsActions from "./settings.actions";

const initState: Setting = {
    selectedDateFormat: { label: "", key: "" },
    selectedLanguage: { label: "", key: "" },
    selectedLunchDuration: 0,
    selectedWorkDuration: 0,
};

export function settingsReducer(state: Setting = initState, action: Action) {
    switch (action.type) {
        case SettingsActions.RESET_SETTINGS:
            return { ...initState };

        case SettingsActions.UPDATE_SETTINGS:
            return { ...state };
    }
}