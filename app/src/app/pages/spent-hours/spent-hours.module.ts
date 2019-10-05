import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpentHoursPage } from './spent-hours.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([{
			path: '',
			component: SpentHoursPage
		}])
	],
	declarations: [SpentHoursPage]
})
export class SpentHoursPageModule { }
