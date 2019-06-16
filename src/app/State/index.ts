import { Setting } from './settings/settings.model';
import { settingsReducer } from './settings/settings.reducer';

import { ExtraHours } from './extraHours/extraHours.model';
import { extraHoursReducer } from './extraHours/extraHours.reducer';

import { OwedHours } from './owedHours/owedHours.model';
import { owedHoursReducer } from './owedHours/owedHours.reducer';


export interface AppState {
    readonly settings: Setting;
    readonly extraHours: ExtraHours;
    readonly owedHours: OwedHours;
}

export const reducers = {
    settings: settingsReducer,
    extraHours: extraHoursReducer,
    owedHours: owedHoursReducer,
};