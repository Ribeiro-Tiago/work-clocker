import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Vibration } from "@ionic-native/vibration/ngx";

import { SettingsPage } from "./settings.page";

import { ResetModalComponent } from "src/app/components/reset-modal/reset-modal.component";

import { SharedModule } from "src/app/shared.module";

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([{
			path: "",
			component: SettingsPage
		}])
	],
	declarations: [SettingsPage, ResetModalComponent],
	providers: [
		AppVersion,
		Vibration
	]
})
export class SettingsPageModule { }
