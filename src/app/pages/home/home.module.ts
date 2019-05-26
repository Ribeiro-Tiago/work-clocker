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
import { DaysListingComponent } from '../../components/days-listing/days-listing.component';
import { ListButtonComponent } from '../../components/list-button/list-button.component';

/* modules */
import { ConverToHoursModule } from 'src/app/pipes/convert-to-hours/convert-to-hours.pipe.module';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
	declarations: [
		HomePage,
		DaysListingComponent,
		ListButtonComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ConverToHoursModule,
		HttpClientModule,
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
