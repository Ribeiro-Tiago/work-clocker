import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import configs from "./configs";
import { ConfigOption, LegalOption } from "../../types/Config";
import { StorageService } from '../../services/storage/storage.service';

/* state models */
import { Setting } from '../../State/settings/settings.model';
import { AppState } from '../../State';

/* state actions */
import { Update as UpdateSettings } from "../../state/settings/settings.actions";
import { ResetHours as ResetExtraHours } from "../../state/extraHours/extraHours.actions";
import { ResetHours as ResetOwedHours } from "../../state/owedHours/owedHours.actions";
import { ResetHours as ResetClockedHours } from "../../state/clockedHours/clockedHours.actions";
import { ResetHours as ResetSpentHours } from "../../state/spentHours/spentHours.actions";

@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SettingsPage implements OnInit, OnDestroy {
	private sub: Subscription;
	private isResetting: boolean;

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

	settings: Observable<Setting>;

	constructor(
		public actionSheetController: ActionSheetController,
		private translate: TranslateService,
		private storage: StorageService,
		private store: Store<AppState>
	) {
		this.dateFormats = configs.dateFormats;
		this.langs = configs.langs;
		this.lunchDuration = configs.lunchDuration;
		this.workDuration = configs.workDuration;
		this.legalities = configs.legalities;
		this.isModalVisible = false;

		this.settings = this.store.select("settings");

		this.sub = null;

		this.isResetting = false;

		this.initInputs();
	}

	ngOnInit(): void {
		this.sub = this.settings.subscribe(result => {
			if (result) {
				this.selectedDateFormat = result.selectedDateFormat;
				this.selectedLanguage = result.selectedLanguage;
				this.selectedLunchDuration = result.selectedLunchDuration;
				this.selectedWorkDuration = result.selectedWorkDuration;
			}
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	onDateFormatChange(selectedId: string) {
		if (this.isResetting) {
			return;
		}

		this.selectedDateFormat = this.dateFormats.find(f => f.key === selectedId);

		this.updateSettings();
	}

	onLangChange(selectedId: string) {
		if (this.isResetting) {
			return;
		}

		this.selectedLanguage = this.langs.find(l => l.key === selectedId);
		this.translate.setDefaultLang(selectedId);
		this.updateSettings();
	}

	onLunchChange(minute: number) {
		if (this.isResetting) {
			return;
		}

		this.selectedLunchDuration = minute;

		this.updateSettings();
	}

	onWorkChange(hour: number) {
		if (this.isResetting) {
			return;
		}

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
				this.toggleModal();
				this.isResetting = true;
				this.resetApp();
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
		const newState = {
			selectedDateFormat: this.selectedDateFormat,
			selectedLanguage: this.selectedLanguage,
			selectedLunchDuration: this.selectedLunchDuration,
			selectedWorkDuration: this.selectedWorkDuration
		};

		this.store.dispatch(new UpdateSettings(newState));

		this.storage.set("settings", newState)
			.then(async () => console.log("settings updated"))
			.catch(err => console.log(err));
	}

	private initInputs() {
		this.selectedDateFormat = this.dateFormats[0];
		this.selectedLanguage = this.langs[0];
		this.selectedLunchDuration = 60;
		this.selectedWorkDuration = 8;
	}

	private resetApp(): void {
		this.initInputs();
		this.updateSettings();

		this.store.dispatch(new ResetExtraHours());
		this.store.dispatch(new ResetOwedHours());
		this.store.dispatch(new ResetSpentHours());

		this.store.dispatch(new ResetClockedHours());

		setTimeout(() => this.isResetting = false, 500);
	}
}
