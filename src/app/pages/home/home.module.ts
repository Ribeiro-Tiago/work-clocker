import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { UpdateLunchModalComponent } from 'src/app/components/update-lunch-modal/update-lunch-modal.component';
import { OwedExtraHoursComponent } from 'src/app/components/owed-extra-hours/owed-extra-hours.component';
import { ClockButtonComponent } from 'src/app/components/clock-button/clock-button.component';

import { SharedModule } from 'src/app/shared.module';
import { OwedHourModalComponent } from 'src/app/components/owed-hour-modal/owed-hour-modal.component';

@NgModule({
	declarations: [
		HomePage,
		UpdateLunchModalComponent,
		OwedExtraHoursComponent,
		ClockButtonComponent,
		OwedHourModalComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild([{
			path: '',
			component: HomePage
		}])
	]
})
export class HomePageModule { }
