import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

/* pages */
import { HomePage } from './home.page';

/* comps */
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { ListButtonComponent } from 'src/app/components/list-button/list-button.component';
import { UpdateLunchModalComponent } from 'src/app/components/update-lunch-modal/update-lunch-modal.component';
import { OwedExtraHoursComponent } from 'src/app/components/owed-extra-hours/owed-extra-hours.component';
import { ClockedHoursComponent } from 'src/app/components/clocked-hours/clocked-hours.component';

/* modules */
import { ConvertTimeModule } from 'src/app/pipes/convert-time/convert-time.pipe.module';
import { CalcClockoutModule } from 'src/app/pipes/calc-clockout/calc-clockout.pipe.module';
import { FormatTimeModule } from 'src/app/pipes/format-time/format-time.pipe.module';
import { SanitizerModule } from 'src/app/pipes/sanitizer/sanitizer.pipe.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
	declarations: [
		HomePage,
		ListItemComponent,
		ListButtonComponent,
		UpdateLunchModalComponent,
		OwedExtraHoursComponent,
		ClockedHoursComponent,
		HeaderComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HttpClientModule,
		ConvertTimeModule,
		CalcClockoutModule,
		FormatTimeModule,
		SanitizerModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomePage
			},
		]),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		})
	]
})
export class HomePageModule { }
