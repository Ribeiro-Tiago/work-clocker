import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { SettingsPage } from './settings.page';

import { ConvertTimeModule } from 'src/app/pipes/convert-time/convert-time.pipe.module';

import { ResetModalComponent } from 'src/app/components/reset-modal/reset-modal.component';

import { HeaderModule } from 'src/app/components/header/header.module';

const routes: Routes = [{
	path: '',
	component: SettingsPage
}];

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
	declarations: [
		SettingsPage,
		ResetModalComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ConvertTimeModule,
		IonicModule,
		HeaderModule,
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
