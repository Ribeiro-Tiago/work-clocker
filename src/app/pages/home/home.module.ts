import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { UpdateLunchModalComponent } from 'src/app/components/update-lunch-modal/update-lunch-modal.component';
import { OwedExtraHoursComponent } from 'src/app/components/owed-extra-hours/owed-extra-hours.component';
import { ClockButtonComponent } from 'src/app/components/clock-button/clock-button.component';

import { SharedModule } from 'src/app/shared.module';
import { CalcClockoutModule } from 'src/app/pipes/calc-clockout/calc-clockout.pipe.module';

@NgModule({
	declarations: [
		HomePage,
		UpdateLunchModalComponent,
		OwedExtraHoursComponent,
		ClockButtonComponent,
	],
	imports: [
		SharedModule,
		CalcClockoutModule,
		RouterModule.forChild([{
			path: '',
			component: HomePage
		}])
	]
})
export class HomePageModule { }
