import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SettingsPage implements OnInit {
	selectedDateFormat: string;
	selectedLanguage: string;
	selectedLunchDuration: number;
	selectedWorkDuration: number;

	constructor(private storage: Storage) {
		this.selectedDateFormat = "";
		this.selectedLanguage = "";
		this.selectedLunchDuration = 0;
		this.selectedWorkDuration = 0;

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

	onDateFormatChange(event) {

	}

	onLanguageChange(event) {

	}

	onLunchDurationChange(event) {

	}

	onWorkDurationChange(event) {

	}

}
