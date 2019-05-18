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
import { DaysListingComponent } from '../components/days-listing/days-listing.component';

/* pipes */
import { ConvertToHoursPipe } from '../pipes/convert-to-hours/convert-to-hours.pipe';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HttpClientModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomePage
			}
		]),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		})
	],
	declarations: [
		HomePage,
		DaysListingComponent,
		ConvertToHoursPipe
	]
})
export class HomePageModule { }
