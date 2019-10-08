import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Vibration } from "@ionic-native/vibration/ngx";
import { Device } from "@ionic-native/device/ngx";

import { SettingsPage } from "./settings.page";

import { ResetModalComponent } from "src/app/components/reset-modal/reset-modal.component";
import { FeedbackModalComponent } from "src/app/components/feedback-modal/feedback-modal.component";

import { SharedModule } from "src/app/shared.module";

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([{
			path: "",
			component: SettingsPage
		}])
	],
	declarations: [
		SettingsPage,
		ResetModalComponent,
		FeedbackModalComponent
	],
	providers: [
		AppVersion,
		Vibration,
		Device
	]
})
export class SettingsPageModule { }
