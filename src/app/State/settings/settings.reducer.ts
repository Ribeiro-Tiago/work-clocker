import { Setting, Action } from "./settings.model";
import * as SettingsActions from "./settings.actions";

export function settingsReducer(state: Setting = null, action: Action) {
    switch (action.type) {
        case SettingsActions.UPDATE_SETTINGS:
            return { ...action.payload };

        default:
            return state;
    }
}