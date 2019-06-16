import { Setting } from './settings/settings.model';
import { settingsReducer } from './settings/settings.reducer';

export interface AppState {
    readonly settings: Setting;
}

export const reducers = {
    settings: settingsReducer,
};