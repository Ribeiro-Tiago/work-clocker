import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";

import { TranslateModule } from "@ngx-translate/core";

import { HeaderModule } from "./components/header/header.module";
import { ConvertTimeModule } from "./pipes/convert-time/convert-time.pipe.module";
import { SanitizerModule } from "./pipes/sanitizer/sanitizer.pipe.module";
import { FormatTimeModule } from "./pipes/format-time/format-time.pipe.module";
import { CalcClockoutModule } from "./pipes/calc-clockout/calc-clockout.pipe.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ConvertTimeModule,
		HeaderModule,
		FormatTimeModule,
		SanitizerModule,
		TranslateModule,
		CalcClockoutModule
	],
	exports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ConvertTimeModule,
		FormatTimeModule,
		HeaderModule,
		SanitizerModule,
		TranslateModule,
		CalcClockoutModule
	],
	providers: [
		FirebaseAnalytics
	]
})
export class SharedModule { }
