import { Setting } from './settings/settings.model';
import { settingsReducer } from './settings/settings.reducer';

import { ExtraHour } from './extraHours/extraHours.model';
import { extraHoursReducer } from './extraHours/extraHours.reducer';

import { OwedHour } from './owedHours/owedHours.model';
import { owedHoursReducer } from './owedHours/owedHours.reducer';

import { ClockedHour } from './clockedHours/clockedHours.model';
import { clockedHoursReducer } from './clockedHours/clockedHours.reducer';

import { SpentHour } from './spentHours/spentHours.model';
import { spentHoursReducer } from './spentHours/spentHours.reducer';

import { Tutorial } from './tutorial/tutorial.model';
import { TutorialsReducer } from './tutorial/tutorial.reducer';

import { Menu } from './menu/menu.model';
import { MenuReducer } from './menu/menu.reducer';

import { Header } from './header/header.model';
import { HeaderReducer } from './header/header.reducer';

import { Intro } from './intro/intro.model';
import { IntroReducer } from './intro/intro.reducer';

import { Notification } from './notifications/notifications.model';
import { NotificationReducer } from './notifications/notifications.reducer';

import { HourPool } from './hourPool/hourPool.model';
import { HourPoolReducer } from './hourPool/hourPool.reducer';

export interface AppState {
    readonly settings: Setting;
    readonly extraHours: ExtraHour;
    readonly owedHours: OwedHour;
    readonly clockedHours: ClockedHour;
    readonly spentHours: SpentHour;
    readonly tutorial: Tutorial;
    readonly menu: Menu;
    readonly header: Header;
    readonly intro: Intro;
    readonly notification: Notification;
    readonly hourPool: HourPool;
}

export const reducers = {
    settings: settingsReducer,
    extraHours: extraHoursReducer,
    owedHours: owedHoursReducer,
    clockedHours: clockedHoursReducer,
    spentHours: spentHoursReducer,
    tutorial: TutorialsReducer,
    menu: MenuReducer,
    header: HeaderReducer,
    intro: IntroReducer,
    notification: NotificationReducer,
    hourPool: HourPoolReducer
};