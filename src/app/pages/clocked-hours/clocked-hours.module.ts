import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ClockedHoursPage } from './clocked-hours.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
	imports: [
		SharedModule,
		TranslateModule,
		RouterModule.forChild([{
			path: '',
			component: ClockedHoursPage
		}])
	],
	declarations: [ClockedHoursPage]
})
export class ClockedHoursPageModule { }
