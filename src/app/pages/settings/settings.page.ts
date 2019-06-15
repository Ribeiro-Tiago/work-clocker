import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
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

	isModalVisible: boolean;

	constructor(private storage: Storage, public actionSheetController: ActionSheetController, private translate: TranslateService) {
		this.dateFormats = configs.dateFormats;
		this.langs = configs.langs;
		this.lunchDuration = configs.lunchDuration;
		this.workDuration = configs.workDuration;
		this.legalities = configs.legalities;
		this.isModalVisible = false;

		this.initInputs();
	}

	ngOnInit() {
		this.storage.get("settings")
			.then((result) => {
				if (result) {
					this.selectedDateFormat = result.selectedDateFormat;
					this.selectedLanguage = result.selectedLanguage;
					this.selectedLunchDuration = result.selectedLunchDuration;
					this.selectedWorkDuration = result.selectedWorkDuration;
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
		this.translate.setDefaultLang(selectedId);
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

	resetSettings() {
		this.storage.clear()
			.then(() => {
				this.initInputs();
				this.toggleModal();
				console.log("settings cleared");
			})
			.catch(err => console.log(err));
	}

	toggleModal(): void {
		this.isModalVisible = !this.isModalVisible;
	}

	resetTutorial(): void {
		// reset
	}

	private updateSettings() {
		this.storage.set("settings", {
			selectedDateFormat: this.selectedDateFormat,
			selectedLanguage: this.selectedLanguage,
			selectedLunchDuration: this.selectedLunchDuration,
			selectedWorkDuration: this.selectedWorkDuration
		})
			.then(() => console.log("settings updated"))
			.catch(err => console.log(err));
	}

	private initInputs() {
		this.selectedDateFormat = this.dateFormats[0];
		this.selectedLanguage = this.langs[0];
		this.selectedLunchDuration = 60;
		this.selectedWorkDuration = 8;
	}
}
