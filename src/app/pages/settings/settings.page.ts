import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';

import configs from "./configs";
import { ConfigOption, LegalOption } from "../../types/Config";

@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SettingsPage implements OnInit {
	dateFormats: ConfigOption[];
	langs: ConfigOption[];
	legalities: LegalOption[];
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
		this.legalities = configs.legalities;
	}

	ngOnInit() {
		this.storage.get("settings")
			.then((result) => {
				if (result) {
					this.selectedDateFormat = result.dateFormat;
					this.selectedLanguage = result.language;
					this.selectedLunchDuration = result.lunchDuration;
					this.selectedWorkDuration = result.workDuration;
				} else {
					this.selectedDateFormat = this.dateFormats[0];
					this.selectedLanguage = this.langs[0];
					this.selectedLunchDuration = 60;
					this.selectedWorkDuration = 8;
				}
			})
			.catch(console.error);
	}

	onDateFormatChange(selectedId: string) {
		this.selectedDateFormat = this.dateFormats.find(f => f.key === selectedId);

		this.updateSettings();
	}

	onLangChange(selectedId: string) {
		this.selectedLanguage = this.langs.find(l => l.key === selectedId);

		this.updateSettings();
	}

	onLunchChange(minute: number) {
		this.selectedLunchDuration = minute;

		this.updateSettings();
	}

	onWorkChange(hour: number) {
		this.selectedWorkDuration = hour;

		this.updateSettings();
	}

	openLink(url: string) {
		if (url) {
			window.open(url, "_system");
		}
	}

	private updateSettings() {
		this.storage.set("settings", {
			dateFormat: this.selectedDateFormat,
			language: this.selectedLanguage,
			lunchDuration: this.selectedLunchDuration,
			workDuration: this.selectedWorkDuration
		})
			.then(() => console.log("settings updated"))
			.catch(err => console.log(err));
	}
}
