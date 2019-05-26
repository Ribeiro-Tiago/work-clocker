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
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { ListButtonComponent } from '../../components/list-button/list-button.component';

/* modules */
import { ConvertTimeModule } from 'src/app/pipes/convert-time/convert-time.pipe.module';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
	declarations: [
		HomePage,
		ListItemComponent,
		ListButtonComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HttpClientModule,
		ConvertTimeModule,
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
