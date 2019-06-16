import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { SpentHoursPage } from './spent-hours.page';

import { ConvertTimeModule } from 'src/app/pipes/convert-time/convert-time.pipe.module';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ConvertTimeModule,
		RouterModule.forChild([{
			path: '',
			component: SpentHoursPage
		}]),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
	],
	declarations: [SpentHoursPage]
})
export class SpentHoursPageModule { }
