import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { Events, Platform } from "@ionic/angular";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Vibration } from "@ionic-native/vibration/ngx";

import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import configs from "./configs";
import poolConfigs from "src/configs/hourPool";
import { ConfigOption, LegalOption, NotifOption, GenericOption } from "src/app/types/Misc";
import { StorageService } from "src/app/services/storage/storage.service";

import Analytics from "src/app/utils/Analytics";
import {
	P_SETTINGS,
	EV_DATE_FORMAT,
	EV_LANGUAGE,
	EV_LUNCH_TYPE,
	EV_CLOCK_IN_NOTIF,
	EV_CLOCK_OUT_NOTIF,
	EV_CLOCK_LUNCH_IN_NOTIF,
	EV_CLOCK_LUNCH_OUT_NOTIF,
	EV_REPEAT_TUTORIAL
} from "src/configs/analytics";

/* state models */
import { Setting } from "src/app/state/settings/settings.model";
import { HourPool } from "src/app/state/hourPool/hourPool.model";
import { AppState } from "src/app/state";

/* state actions */
import { Update as UpdateSettings } from "src/app/state/settings/settings.actions";
import { ResetHours as ResetExtraHours } from "src/app/state/extraHours/extraHours.actions";
import { ResetHours as ResetOwedHours } from "src/app/state/owedHours/owedHours.actions";
import { ResetHours as ResetClockedHours } from "src/app/state/clockedHours/clockedHours.actions";
import { ResetHours as ResetSpentHours } from "src/app/state/spentHours/spentHours.actions";
import { Reset as ResetTutorial } from "src/app/state/tutorial/tutorial.actions";
import { ResetPool, SetPool } from "src/app/state/hourPool/hourPool.actions";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.page.html",
	styleUrls: ["./settings.page.scss"],
	encapsulation: ViewEncapsulation.None
})
export class SettingsPage extends Analytics implements OnInit, OnDestroy {
	private subs: Subscription[];
	private $notifHandler: Subscription;
	private processNotifUpdate: boolean;
	private isResetting: boolean;

	dateFormats: ConfigOption[];
	langs: ConfigOption[];
	lunchTypes: GenericOption[];
	legalities: LegalOption[];
	lunchDuration: number[];
	workDuration: number[];

	selectedDateFormat: ConfigOption;
	selectedLanguage: ConfigOption;
	selectedLunchDuration: number;
	selectedLunchType: GenericOption;
	selectedWorkDuration: number;
	clockinNotif: NotifOption;
	clockoutNotif: NotifOption;
	clockinLunchNotif: NotifOption;
	clockoutLunchNotif: NotifOption;

	initClockInChecked: boolean;
	initClockOutChecked: boolean;
	initLunchClockOutChecked: boolean;
	initLunchClockInChecked: boolean;

	isResetVisible: boolean;
	isFeedbackVisible: boolean;

	displayFormat: string;

	settings$: Observable<Setting>;
	hourPool$: Observable<HourPool>;

	today: Date;

	version: string;

	hourPool: HourPool;
	poolTypes: GenericOption[];
	initPoolToggle: boolean;

	constructor(
		private translate: TranslateService,
		private storage: StorageService,
		private store: Store<AppState>,
		private location: Location,
		private events: Events,
		private localNotif: LocalNotifications,
		private appVersion: AppVersion,
		private platform: Platform,
		private vibration: Vibration
	) {
		super(P_SETTINGS);

		this.dateFormats = configs.dateFormats;
		this.langs = configs.langs;
		this.lunchDuration = configs.lunchDuration;
		this.workDuration = configs.workDuration;
		this.legalities = configs.legalities;
		this.lunchTypes = configs.lunchTypes;
		this.isResetVisible = false;
		this.isFeedbackVisible = false;

		this.displayFormat = this.dateFormats[0].hour;
		this.selectedLunchType = this.lunchTypes[0];

		this.today = new Date();

		this.settings$ = this.store.select("settings");
		this.hourPool$ = this.store.select("hourPool");

		this.subs = [];

		this.isResetting = false;

		this.hourPool = { hasPool: false };

		this.poolTypes = poolConfigs;

		this.appVersion.getVersionNumber().then((version) => this.version = version);

		this.processNotifUpdate = false;

		this.$notifHandler = null;

		this.initInputs();
	}

	ngOnInit(): void {
		this.subs.push(
			this.settings$.subscribe(result => {
				if (result) {
					this.selectedDateFormat = result.selectedDateFormat;
					this.selectedLanguage = result.selectedLanguage;
					this.selectedLunchDuration = result.selectedLunchDuration;
					this.selectedWorkDuration = result.selectedWorkDuration;
					this.selectedLunchType = result.selectedLunchType;
					this.clockinNotif = result.clockinNotif;
					this.clockoutNotif = result.clockoutNotif;
					this.clockinLunchNotif = result.clockinLunchNotif;
					this.clockoutLunchNotif = result.clockoutLunchNotif;

					if (this.initClockInChecked === undefined && result.clockoutLunchNotif) {
						this.initClockInChecked = result.clockinNotif.enabled;
					}

					if (this.initClockOutChecked === undefined && result.clockoutLunchNotif) {
						this.initClockOutChecked = result.clockoutNotif.enabled;
					}

					if (this.initLunchClockOutChecked === undefined && result.clockoutLunchNotif) {
						this.initLunchClockOutChecked = result.clockoutLunchNotif.enabled;
					}

					if (this.initLunchClockInChecked === undefined && result.clockinLunchNotif) {
						this.initLunchClockInChecked = result.clockinLunchNotif.enabled;
					}

					if (result.selectedDateFormat.hour) {
						this.displayFormat = result.selectedDateFormat.hour;
					}
				}
			}),
			this.hourPool$.subscribe(result => {
				this.hourPool = result;

				if (this.initPoolToggle === undefined) {
					this.initPoolToggle = result.hasPool;
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
		if (this.$notifHandler) {
			this.$notifHandler.unsubscribe();
		}
	}

	onDateFormatChange(selectedId: string): void {
		if (this.isResetting) {
			return;
		}

		this.selectedDateFormat = this.dateFormats.find(f => f.key === selectedId);

		this.displayFormat = this.selectedDateFormat.hour;

		this.events.publish("showToast", "settings.dateFormatSuccess");

		this.log(EV_DATE_FORMAT, this.selectedDateFormat.key);

		this.updateSettings();
	}

	onLangChange(selectedId: string): void {
		if (this.isResetting) {
			return;
		}

		this.selectedLanguage = this.langs.find(l => l.key === selectedId);
		this.translate.setDefaultLang(selectedId);

		this.events.publish("showToast", "settings.languageSuccess");

		this.log(EV_LANGUAGE, this.selectedLanguage.key);

		this.updateSettings();
	}

	onLunchChange(minute: number): void {
		if (this.isResetting) {
			return;
		}

		this.selectedLunchDuration = minute;

		this.events.publish("showToast", "settings.lunchDurationSuccess");

		this.updateSettings();
	}

	onLunchTypeChange(type: string): void {
		if (this.isResetting || !type) {
			return;
		}

		this.selectedLunchType = this.lunchTypes.find(l => l.value === type);

		this.events.publish("showToast", "settings.lunchTypeSuccess");

		this.log(EV_LUNCH_TYPE, this.selectedLunchType.value);

		this.updateSettings();
	}

	onWorkChange(hour: number): void {
		if (this.isResetting) {
			return;
		}

		this.selectedWorkDuration = hour;

		this.events.publish("showToast", "settings.workDurationSuccess");

		this.updateSettings();
	}

	async toggleInNotif(): Promise<void> {
		if (this.isResetting) {
			return;
		}

		const isEnabled = this.clockinNotif.enabled;

		if (isEnabled) {
			this.events.publish("showToast", "settings.clockinNotifDisable");
			await this.cancelNotif(configs.notifs.ids.clockIn);
		} else {
			this.events.publish("showToast", "settings.clockinNotifEnable");

			this.processNotifUpdate = false;

			const d = new Date();
			d.setMinutes(d.getMinutes() - 1);

			this.addNotif(configs.notifs.ids.clockIn, d, "clockin");
			this.clockinNotif.time = d.toISOString();
		}

		this.clockinNotif.enabled = !isEnabled;


		this.log(EV_CLOCK_IN_NOTIF, !isEnabled);

		this.updateSettings();
	}

	onInNotifTimerChange(time: string): void {
		if (this.isResetting && !this.processNotifUpdate) {
			this.processNotifUpdate = true;
			return;
		}

		this.clockinNotif.time = time;

		this.addNotif(configs.notifs.ids.clockIn, new Date(time), "clockin");

		this.events.publish("showToast", "settings.remniderTimerUpdate");

		this.updateSettings();
	}

	async toggleOutNotif(): Promise<void> {
		if (this.isResetting) {
			return;
		}

		const isEnabled = this.clockoutNotif.enabled;

		if (isEnabled) {
			this.events.publish("showToast", "settings.clockoutNotifDisable");
			await this.cancelNotif(configs.notifs.ids.clockOut);
		} else {
			this.events.publish("showToast", "settings.clockoutNotifEnable");

			const d = new Date();
			d.setMinutes(d.getMinutes() - 1);

			this.addNotif(configs.notifs.ids.clockOut, d, "clockout");
			this.processNotifUpdate = false;
			this.clockoutNotif.time = d.toISOString();
		}

		this.clockoutNotif.enabled = !isEnabled;


		this.log(EV_CLOCK_OUT_NOTIF, !isEnabled);

		this.updateSettings();
	}

	onOutNotifTimerChange(time: string): void {
		if (this.isResetting && !this.processNotifUpdate) {
			this.processNotifUpdate = true;
			return;
		}

		this.clockoutNotif.time = time;

		this.addNotif(configs.notifs.ids.clockOut, new Date(time), "clockout");

		this.events.publish("showToast", "settings.remniderTimerUpdate");

		this.updateSettings();
	}

	async toggleLunchInNotif(): Promise<void> {
		if (this.isResetting && !this.processNotifUpdate) {
			this.processNotifUpdate = true;
			return;
		}

		const isEnabled = this.clockinLunchNotif.enabled;

		if (isEnabled) {
			this.events.publish("showToast", "settings.lunchInNotifDisable");
			await this.cancelNotif(configs.notifs.ids.lunchIn);
		} else {
			this.events.publish("showToast", "settings.lunchInNotifEnable");

			const d = new Date();
			d.setMinutes(d.getMinutes() - 1);

			this.addNotif(configs.notifs.ids.clockOut, d, "clockout");
			this.processNotifUpdate = false;
			this.clockinLunchNotif.time = d.toISOString();
		}

		this.clockinLunchNotif.enabled = !isEnabled;


		this.log(EV_CLOCK_LUNCH_IN_NOTIF, !isEnabled);

		this.updateSettings();
	}

	onLunchInNotifTimerChange(time: string): void {
		if (this.isResetting && !this.processNotifUpdate) {
			this.processNotifUpdate = true;
			return;
		}

		this.clockinLunchNotif.time = time;

		this.addNotif(configs.notifs.ids.lunchIn, new Date(time), "lunchIn");

		this.events.publish("showToast", "settings.remniderTimerUpdate");

		this.updateSettings();
	}

	async toggleLunchOutNotif(): Promise<void> {
		if (this.isResetting) {
			return;
		}

		const isEnabled = this.clockoutLunchNotif.enabled;

		if (isEnabled) {
			this.events.publish("showToast", "settings.lunchOutNotifEnable");
			await this.cancelNotif(configs.notifs.ids.lunchOut);
		} else {
			this.events.publish("showToast", "settings.lunchOutNotifDisable");

			const d = new Date();
			d.setMinutes(d.getMinutes() - 1);

			this.addNotif(configs.notifs.ids.lunchIn, d, "lunchIn");
			this.processNotifUpdate = false;
			this.clockoutLunchNotif.time = d.toISOString();
		}

		this.clockoutLunchNotif.enabled = !isEnabled;


		this.log(EV_CLOCK_LUNCH_OUT_NOTIF, !isEnabled);

		this.updateSettings();
	}

	onLunchOutNotifTimerChange(time: string): void {
		if (this.isResetting) {
			return;
		}

		this.clockoutLunchNotif.time = time;

		this.addNotif(configs.notifs.ids.lunchOut, new Date(time), "lunchOut");

		this.events.publish("showToast", "settings.remniderTimerUpdate");

		this.updateSettings();
	}

	openLink(name: string): void {
		if (this.platform.is("ios")) {
			window.location.href = `${configs.docHosting}/${name}.pdf`;
		} else {
			window.open(`${configs.docHosting}/${name}.pdf`, "_blank");
		}
	}

	resetSettings(): void {
		this.toggleModal();
		this.isResetting = true;
		this.resetApp();
	}

	toggleModal(): void {
		this.isResetVisible = !this.isResetVisible;
	}

	resetTutorial(): void {
		this.location.back();

		this.storage.delete("tutorial")
			.then(() => console.log("tutorial reset"))
			.catch(console.error);

		this.store.dispatch(new ResetTutorial());

		this.log(EV_REPEAT_TUTORIAL);
	}

	togglePool(): void {
		if (this.isResetting) {
			return;
		}

		this.hourPool.hasPool = !this.hourPool.hasPool;

		this.updatePool();
	}

	onInputChange(num: number): void {
		this.hourPool.hoursLeft = num * 60;

		this.updatePool();
	}

	updatePool(): void {
		this.events.publish("showToast", "settings.updatePoolSuccess");

		this.store.dispatch(new SetPool(this.hourPool));

		this.storage.set("poolHour", this.hourPool)
			.then(() => console.log("hour pool updated"))
			.catch(err => console.log(err));
	}

	toggleFeedback(): void {
		this.isFeedbackVisible = !this.isFeedbackVisible;
	}

	private updateSettings(): void {
		const newState = {
			selectedDateFormat: this.selectedDateFormat,
			selectedLanguage: this.selectedLanguage,
			selectedLunchDuration: this.selectedLunchDuration,
			selectedWorkDuration: this.selectedWorkDuration,
			selectedLunchType: this.selectedLunchType,
			clockinNotif: this.clockinNotif,
			clockoutNotif: this.clockoutNotif,
			clockinLunchNotif: this.clockinLunchNotif,
			clockoutLunchNotif: this.clockoutLunchNotif
		};

		this.store.dispatch(new UpdateSettings(newState));

		this.storage.set("settings", newState)
			.then(() => console.log("settings updated"))
			.catch(err => console.log(err));
	}

	private initInputs(): void {
		this.selectedDateFormat = this.dateFormats[0];
		this.selectedLanguage = this.langs[0];
		this.selectedLunchType = this.lunchTypes[0];
		this.selectedLunchDuration = 60;
		this.selectedWorkDuration = 8;
		this.clockinNotif = { ...configs.notifs.defaultTime };
		this.clockoutNotif = { ...configs.notifs.defaultTime };
	}

	private async resetApp(): Promise<void> {
		this.events.publish("showToast", "settings.resetSuccess");

		this.initInputs();
		this.updateSettings();

		this.store.dispatch(new ResetExtraHours());
		this.store.dispatch(new ResetOwedHours());
		this.store.dispatch(new ResetSpentHours());
		this.store.dispatch(new ResetClockedHours());
		this.store.dispatch(new ResetPool());

		this.cancelNotif(configs.notifs.ids.clockIn);
		this.cancelNotif(configs.notifs.ids.clockOut);
		this.cancelNotif(configs.notifs.ids.lunchIn);
		this.cancelNotif(configs.notifs.ids.lunchOut);

		this.initClockInChecked = false;
		this.initClockOutChecked = false;

		this.storage.clearExcept(["settings", "tutorial", "intro"])
			.then(() => console.log("settings cleared"))
			.catch(console.error);

		setTimeout(() => this.isResetting = false, 500);

		this.location.back();
	}

	private async getText(key: string): Promise<string> {
		return await this.translate.get(key).toPromise();
	}

	private async cancelNotif(id: number): Promise<void> {
		try {
			await Promise.all([
				this.localNotif.cancel(id),
				this.localNotif.clear(id)
			]);

			this.$notifHandler.unsubscribe();
		} catch (ex) { }
	}

	private async addNotif(id: number, time: Date, text: string): Promise<void> {
		const texts = await Promise.all([
			this.getText(`settings.${text}ReminderText`),
			this.getText(`settings.${text}ReminderTitle`)
		]);

		await this.cancelNotif(id);

		this.$notifHandler = this.localNotif.on("trigger").subscribe(() => this.vibration.vibrate(500));

		this.localNotif.schedule({
			id,
			text: texts[0],
			title: texts[1],
			vibrate: true,
			wakeup: true,
			icon: "res://ic_launcher",
			smallIcon: "res://smallicon",
			color: "49AC4D",
			trigger: {
				count: 1,
				every: {
					hour: time.getHours(), minute: time.getMinutes()
				}
			}
		});
	}
}
