import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Events } from '@ionic/angular';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import configs from "./configs";
import { ConfigOption, LegalOption, NotifOption } from "../../types/Misc";
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
import { Reset as ResetTutorial } from "../../state/tutorial/tutorial.actions";

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
	clockinNotif: NotifOption;
	clockoutNotif: NotifOption;

	initClockInChecked: boolean;
	initClockOutChecked: boolean;

	isModalVisible: boolean;

	displayFormat: string;

	settings: Observable<Setting>;

	today: Date;

	constructor(
		private translate: TranslateService,
		private storage: StorageService,
		private store: Store<AppState>,
		private location: Location,
		private events: Events,
		private localNotif: LocalNotifications
	) {
		this.dateFormats = configs.dateFormats;
		this.langs = configs.langs;
		this.lunchDuration = configs.lunchDuration;
		this.workDuration = configs.workDuration;
		this.legalities = configs.legalities;
		this.isModalVisible = false;

		this.displayFormat = this.dateFormats[0].hour;

		this.today = new Date();

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
				this.clockinNotif = result.clockinNotif;
				this.clockoutNotif = result.clockoutNotif;

				if (this.initClockInChecked === undefined) {
					this.initClockInChecked = result.clockinNotif.enabled;
					this.initClockOutChecked = result.clockoutNotif.enabled;
				}

				if (result.selectedDateFormat.hour) {
					this.displayFormat = result.selectedDateFormat.hour;
				}
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

		this.displayFormat = this.selectedDateFormat.hour;

		this.events.publish("showToast", "settings.dateFormatSuccess");

		this.updateSettings();
	}

	onLangChange(selectedId: string) {
		if (this.isResetting) {
			return;
		}

		this.selectedLanguage = this.langs.find(l => l.key === selectedId);
		this.translate.setDefaultLang(selectedId);

		this.events.publish("showToast", "settings.languageSuccess");

		this.updateSettings();
	}

	onLunchChange(minute: number) {
		if (this.isResetting) {
			return;
		}

		this.selectedLunchDuration = minute;

		this.events.publish("showToast", "settings.lunchDurationSuccess");

		this.updateSettings();
	}

	onWorkChange(hour: number) {
		if (this.isResetting) {
			return;
		}

		this.selectedWorkDuration = hour;

		this.events.publish("showToast", "settings.workDurationSuccess");

		this.updateSettings();
	}

	toggleInNotif(): Promise<void> {
		if (this.isResetting) {
			return;
		}

		const { enabled, time } = this.clockinNotif;

		if (enabled) {
			this.events.publish("showToast", "settings.clockinNotifDisable");
			this.cancelNotif(1);
		} else {
			this.events.publish("showToast", "settings.clockinNotifEnable");
			this.addClockinNotif(new Date(time));
		}

		this.clockinNotif.enabled = !enabled;

		this.updateSettings();
	}

	onInNotifTimerChange(time: string): Promise<void> {
		if (this.isResetting) {
			return;
		}

		this.cancelNotif(1);

		this.clockinNotif.time = time;

		this.addClockinNotif(new Date(time));

		this.events.publish("showToast", "settings.remniderTimerUpdate");

		this.updateSettings();
	}

	toggleOutNotif(): void {
		if (this.isResetting) {
			return;
		}

		const { enabled, time } = this.clockoutNotif;

		if (enabled) {
			this.events.publish("showToast", "settings.clockoutNotifDisable");
			this.cancelNotif(2);
		} else {
			this.events.publish("showToast", "settings.clockoutNotifEnable");
			this.addClockoutNotif(new Date(time));
		}

		this.clockoutNotif.enabled = !enabled;

		this.updateSettings();
	}

	onOutNotifTimerChange(time: string): void {
		if (this.isResetting) {
			return;
		}

		this.cancelNotif(2);

		this.clockoutNotif.time = time;

		this.addClockoutNotif(new Date(time));

		this.events.publish("showToast", "settings.remniderTimerUpdate");

		this.updateSettings();
	}

	openLink(url: string) {
		if (url) {
			window.open(url, "_system");
		}
	}

	resetSettings() {
		this.toggleModal();
		this.isResetting = true;
		this.resetApp();
	}

	toggleModal(): void {
		this.isModalVisible = !this.isModalVisible;
	}

	resetTutorial(): void {
		this.location.back();

		this.storage.delete("tutorial")
			.then(() => console.log("tutorial reset"))
			.catch(console.error);

		this.store.dispatch(new ResetTutorial());
	}

	private updateSettings() {
		const newState = {
			selectedDateFormat: this.selectedDateFormat,
			selectedLanguage: this.selectedLanguage,
			selectedLunchDuration: this.selectedLunchDuration,
			selectedWorkDuration: this.selectedWorkDuration,
			clockinNotif: this.clockinNotif,
			clockoutNotif: this.clockoutNotif
		};

		this.store.dispatch(new UpdateSettings(newState));

		this.storage.set("settings", newState)
			.then(() => console.log("settings updated"))
			.catch(err => console.log(err));
	}

	private initInputs() {
		this.selectedDateFormat = this.dateFormats[0];
		this.selectedLanguage = this.langs[0];
		this.selectedLunchDuration = 60;
		this.selectedWorkDuration = 8;
		this.clockinNotif = { ...configs.clockNotif };
		this.clockoutNotif = { ...configs.clockNotif };
	}

	private async resetApp(): Promise<void> {
		this.events.publish("showToast", "settings.resetSuccess");

		this.initInputs();
		this.updateSettings();

		this.store.dispatch(new ResetExtraHours());
		this.store.dispatch(new ResetOwedHours());
		this.store.dispatch(new ResetSpentHours());
		this.store.dispatch(new ResetClockedHours());

		this.storage.clearExcept(["settings", "tutorial", "intro"])
			.then(() => console.log("settings cleared"))
			.catch(console.error);

		setTimeout(() => this.isResetting = false, 500);
	}

	private async getText(key: string): Promise<string> {
		return await this.translate.get(key).toPromise();
	}

	private cancelNotif(id: number): void {
		this.localNotif.cancel(id);
	}

	private async addClockinNotif(time: Date): Promise<void> {
		this.localNotif.schedule({
			id: 1,
			foreground: true,
			text: await this.getText("settings.clockinReminderText"),
			vibrate: true,
			wakeup: true,
			title: await this.getText("settings.clockinReminderTitle,"),
			trigger: {
				every: {
					hour: time.getHours(), minute: time.getMinutes()
				}
			}
		});
	}

	private async addClockoutNotif(time: Date): Promise<void> {
		this.localNotif.schedule({
			id: 2,
			foreground: true,
			text: await this.getText("settings.clockoutReminderText"),
			vibrate: true,
			wakeup: true,
			title: await this.getText("settings.clockoutReminderTitle,"),
			trigger: {
				every: {
					hour: time.getHours(), minute: time.getMinutes()
				}
			}
		});
	}
}
