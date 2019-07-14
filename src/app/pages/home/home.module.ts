import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { UpdateLunchModalComponent } from 'src/app/components/update-lunch-modal/update-lunch-modal.component';
import { OwedExtraHoursComponent } from 'src/app/components/owed-extra-hours/owed-extra-hours.component';

import { SharedModule } from 'src/app/shared.module';

@NgModule({
	declarations: [
		HomePage,
		UpdateLunchModalComponent,
		OwedExtraHoursComponent,
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
