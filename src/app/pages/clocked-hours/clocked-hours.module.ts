import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ClockedHoursPage } from './clocked-hours.page';
import { SharedModule } from 'src/app/shared.module';

import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { CalcClockoutModule } from 'src/app/pipes/calc-clockout/calc-clockout.pipe.module';

@NgModule({
	imports: [
		SharedModule,
		TranslateModule,
		CalcClockoutModule,
		RouterModule.forChild([{
			path: '',
			component: ClockedHoursPage
		}])
	],
	declarations: [
		ClockedHoursPage,
		ListItemComponent,
	]
})
export class ClockedHoursPageModule { }
