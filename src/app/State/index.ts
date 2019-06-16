import { Setting } from './settings/settings.model';
import { settingsReducer } from './settings/settings.reducer';

import { ExtraHour } from './extraHours/extraHours.model';
import { extraHoursReducer } from './extraHours/extraHours.reducer';

import { OwedHour } from './owedHours/owedHours.model';
import { owedHoursReducer } from './owedHours/owedHours.reducer';

import { ClockedHour } from './clockedHours/clockedHours.model';
import { clockedHoursReducer } from './clockedHours/clockedHours.reducer';


export interface AppState {
    readonly settings: Setting;
    readonly extraHours: ExtraHour;
    readonly owedHours: OwedHour;
    readonly clockedHours: ClockedHour;
}

export const reducers = {
    settings: settingsReducer,
    extraHours: extraHoursReducer,
    owedHours: owedHoursReducer,
    clockedHours: clockedHoursReducer,
};