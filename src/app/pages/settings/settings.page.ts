import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage';

import configs from "./configs";
import { ConfigOption } from 'src/app/types/Config';
import { ActionSheetController } from '@ionic/angular';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SettingsPage implements OnInit {
	dateFormats: ConfigOption[];
	langs: ConfigOption[];
	lunchDuration: number[];
	workDuration: number[];

	selectedDateFormat: ConfigOption;
	selectedLanguage: ConfigOption;
	selectedLunchDuration: number;
	selectedWorkDuration: number;

	constructor(private storage: Storage, public actionSheetController: ActionSheetController) {
		this.selectedDateFormat = { label: "", key: "" };
		this.selectedLanguage = { label: "", key: "" };
		this.selectedLunchDuration = 0;
		this.selectedWorkDuration = 0;

		this.dateFormats = configs.dateFormats;
		this.langs = configs.langs;
		this.lunchDuration = configs.lunchDuration;
		this.workDuration = configs.workDuration;
	}

	ngOnInit() {
		this.storage.get("settings")
			.then((result) => {
				if (result) {
					this.selectedDateFormat = result.selectedDateFormat;
					this.selectedLanguage = result.selectedLanguage;
					this.selectedLunchDuration = result.selectedLunchDuration;
					this.selectedWorkDuration = result.selectedWorkDuration;
				} else {
					this.selectedDateFormat = this.dateFormats[0];
					this.selectedLanguage = this.langs[0];
					this.selectedLunchDuration = 60;
					this.selectedWorkDuration = 8;
				}
			})
			.catch(console.error);
	}

	onDateFormatChange(event) {
		this.selectedDateFormat = event;
		console.log(event);
	}

	onLanguageChange(event) {
		console.log(event);
	}

	onLunchDurationChange(event) {
		console.log(event);
	}

	onWorkDurationChange(event) {
		console.log(event);
	}
}
