import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';

import configs from "./configs";
import { ConfigOption, LegalOption } from "../../types/Config";
import { StorageService } from 'src/app/services/storage/storage.service';

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

	constructor(
		public actionSheetController: ActionSheetController,
		private translate: TranslateService,
		private storage: StorageService
	) {
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
			.then(async () => {
				this.initInputs();
				this.toggleModal();

				await Promise.all([
					this.storage.add("extraHours", 0),
					this.storage.add("owedHours", 0)
				]);

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
		this.storage.update("settings", {
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
