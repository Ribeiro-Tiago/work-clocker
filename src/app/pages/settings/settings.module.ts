import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);

import { SettingsPage } from './settings.page';
import { ConverToHoursModule } from 'src/app/pipes/convert-to-hours/convert-to-hours.pipe.module';

const routes: Routes = [{
	path: '',
	component: SettingsPage
}];

@NgModule({
	declarations: [
		SettingsPage,
	],
	imports: [
		CommonModule,
		FormsModule,
		ConverToHoursModule,
		IonicModule,
		RouterModule.forChild(routes),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
	],
})
export class SettingsPageModule { }
