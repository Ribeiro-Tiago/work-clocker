import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/* pages */
import { HomePage } from './home.page';

/* comps */
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { ListButtonComponent } from 'src/app/components/list-button/list-button.component';
import { UpdateLunchModalComponent } from 'src/app/components/update-lunch-modal/update-lunch-modal.component';
import { OwedExtraHoursComponent } from 'src/app/components/owed-extra-hours/owed-extra-hours.component';
import { ClockedHoursComponent } from 'src/app/components/clocked-hours/clocked-hours.component';

/* modules */
import { CalcClockoutModule } from 'src/app/pipes/calc-clockout/calc-clockout.pipe.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
	declarations: [
		HomePage,
		ListItemComponent,
		ListButtonComponent,
		UpdateLunchModalComponent,
		OwedExtraHoursComponent,
		ClockedHoursComponent,
	],
	imports: [
		CalcClockoutModule,
		SharedModule,
		RouterModule.forChild([{
			path: '',
			component: HomePage
		}])
	]
})
export class HomePageModule { }
