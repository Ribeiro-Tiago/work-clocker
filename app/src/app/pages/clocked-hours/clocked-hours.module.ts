import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ClockedHoursPage } from './clocked-hours.page';
import { SharedModule } from 'src/app/shared.module';

import { ListItemComponent } from 'src/app/components/list-item/list-item.component';

@NgModule({
	imports: [
		SharedModule,
		TranslateModule,
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
