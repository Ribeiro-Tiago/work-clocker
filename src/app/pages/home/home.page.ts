import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Platform, Events } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage/storage.service';
import { ClockedHour } from 'src/app/types/Hour';
import { ClockedHour as StateClockedHour } from 'src/app/State/clockedHours/clockedHours.model';
import { AppState } from 'src/app/State';

import { environment } from 'src/environments/environment';

import * as extraHoursActions from "src/app/state/extraHours/extraHours.actions";
import * as owedHoursActions from "src/app/state/owedHours/owedHours.actions";
import * as clockedActions from "src/app/state/clockedHours/clockedHours.actions";
import { AddHours as AddSpentHour } from "src/app/state/spentHours/spentHours.actions";

import { Setting } from 'src/app/state/settings/settings.model';
import { ExtraHour } from 'src/app/State/extraHours/extraHours.model';
import { OwedHour } from 'src/app/State/owedHours/owedHours.model';
import { Tutorial, TutorialStage } from 'src/app/State/tutorial/tutorial.model';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, OnDestroy {
	private subs: Subscription[];
	private owedHoursObs: Observable<OwedHour>;
	private extraHoursObs: Observable<ExtraHour>;
	private clockedHoursObs: Observable<StateClockedHour>;
	private settingsObs: Observable<Setting>;
	private tutObs: Observable<Tutorial>;

	lunchDuration: number;
	workDuration: number;
	dateFormat: string;

	clockedHours: ClockedHour[];
	owedHours: OwedHour;
	extraHours: ExtraHour;

	tutStage: TutorialStage;
	tutItem: ClockedHour;

	isLoading: boolean;
	activeClock: boolean;
	isModalVisible: boolean;
	isTutVisible: boolean;

	constructor(
		private storage: StorageService,
		private store: Store<AppState>,
		private admobFree: AdMobFree,
		private platform: Platform,
		private events: Events,
	) {
		this.owedHoursObs = store.select("owedHours");
		this.extraHoursObs = store.select("extraHours");
		this.clockedHoursObs = store.select("clockedHours");
		this.settingsObs = store.select("settings");
		this.tutObs = store.select("tutorial");

		this.tutItem = {
			day: 1560893131236,
			startHour: 1560893131236,
			isActive: false,
			lunchDuration: 60,
			endHour: 1560921931236,
			timeWorked: 480
		};

		this.isLoading = true;
		this.isModalVisible = false;
		this.isTutVisible = false;

		this.setupAd();
	}

	ngOnInit(): void {
		this.subs = [
			this.owedHoursObs.subscribe((result: OwedHour) => this.owedHours = result),
			this.extraHoursObs.subscribe((result: ExtraHour) => this.extraHours = result),
			this.clockedHoursObs.subscribe((result: StateClockedHour) => {
				this.activeClock = result.isActive;
				this.clockedHours = [...result.hours];
			}),
			this.settingsObs.subscribe((result: Setting) => {
				this.lunchDuration = result.selectedLunchDuration;
				this.workDuration = result.selectedWorkDuration;
				this.dateFormat = result.selectedDateFormat.key;
			}),
			this.tutObs.subscribe(({ isVisible, stage }: Tutorial) => {
				this.isTutVisible = isVisible;
				this.tutStage = stage;

				if (!isVisible) {
					this.showAd();
				} else {
					this.hideAd();
				}
			})
		];
	}

	ngOnDestroy(): void {
		this.subs.forEach(sub => sub.unsubscribe());
	}

	onBtnPress(): void {
		if (this.activeClock) {
			this.clockOut();
		} else {
			this.clockIn();
		}
	}

	clockIn(): void {
		const d = Date.now();
		const item: ClockedHour = {
			day: d,
			startHour: d,
			isActive: true,
			lunchDuration: this.lunchDuration
		};

		this.showToast("home.clockedIn");

		this.store.dispatch(new clockedActions.AddHour(item));

		this.storage.update("clockedHours", item)
			.then(() => console.log("added hour"))
			.catch((err) => console.log("err adding hour: ", err));
	}

	clockOut(): void {
		const currItem = this.clockedHours[0];
		const d = Date.now();
		const timeWorkedSecs = (d - currItem.startHour - (currItem.lunchDuration * 60000)) / 1000;
		const minutesWorked = Math.floor(timeWorkedSecs / 60);

		const timeWorkedDiff = (minutesWorked / 60) - this.workDuration;

		this.showToast("home.clockedOut");

		currItem.endHour = d;
		currItem.timeWorked = minutesWorked;
		currItem.isActive = false;

		if (timeWorkedDiff < 0) {
			/* worked less hours than expected, use extra hours / check how many hours owed now */
			const owedHours = this.useExtraHours(Math.abs(timeWorkedDiff) * 60);

			if (owedHours > 0) {
				this.store.dispatch(new owedHoursActions.AddHours(owedHours));

				this.storage.set("owedHours", this.owedHours)
					.then(() => console.log("owed hours updated: ", this.owedHours.hours))
					.catch(console.error);
			}
		} else if (timeWorkedDiff > 0) {
			/* worked more hours than expected, use for owed hours / check how many extra hours */
			const extraHOurs = this.payOwedHours(timeWorkedDiff * 60);

			this.store.dispatch(new extraHoursActions.AddHours(extraHOurs));

			this.storage.set("extraHours", this.extraHours)
				.then(() => console.log("extra hours updated: ", this.extraHours.hours))
				.catch(console.error);
		}

		this.store.dispatch(new clockedActions.UpdateHours({ hours: this.clockedHours, isActive: false }));

		this.storage.set("clockedHours", this.clockedHours)
			.then(() => console.log("updated hour"))
			.catch(console.error);
	}


	toggleLunchUpdate(canUpdate: boolean = true): void {
		if (canUpdate) {
			this.isModalVisible = !this.isModalVisible;
		}
	}

	updateLunchTime(duration: number): void {
		if (this.clockedHours[0].lunchDuration === duration) {
			this.toggleLunchUpdate();
			return;
		}

		this.clockedHours[0].lunchDuration = duration;

		this.toggleLunchUpdate();

		this.showToast("listItem.lunchHourUpdated");

		this.store.dispatch(new clockedActions.UpdateHours({
			hours: this.clockedHours,
			isActive: this.activeClock
		}));

		this.storage.set("clockedHours", this.clockedHours)
			.then(() => console.log("updated lunch hour"))
			.catch((err) => console.log("err updating hour: ", err));
	}

	private useExtraHours(owedMinutes: number): number {
		const currExtraMin = this.extraHours.hours;
		let leftover = owedMinutes;

		if (currExtraMin > 0) {
			const extraMins = currExtraMin - owedMinutes;
			let minsUsed = 0;

			if (extraMins < 0) {
				leftover = extraMins * -1;
				minsUsed = currExtraMin;

				this.store.dispatch(new extraHoursActions.ResetHours());
			} else {
				leftover = 0;
				minsUsed = owedMinutes;

				this.store.dispatch(new extraHoursActions.UpdateHours(extraMins));
			}

			this.store.dispatch(new AddSpentHour({
				hours: minsUsed,
				day: Date.now(),
				prevHours: currExtraMin,
				afterHours: this.extraHours.hours,
			}));

			this.storage.set("extraHours", this.extraHours)
				.then(() => console.log("extra hours used"))
				.catch(console.error);
		}

		return leftover;
	}

	private payOwedHours(extraMinutes: number): number {
		const currOwedMin = this.owedHours.hours;
		let leftover = extraMinutes;

		if (currOwedMin > 0) {
			/* ver se as horas extra cobrem as owed */
			const extraMins = currOwedMin - extraMinutes;
			let minsUsed = 0;

			/* se não */
			if (extraMins > 0) {
				leftover = 0;
				minsUsed = extraMinutes;

				this.store.dispatch(new extraHoursActions.ResetHours());
				this.store.dispatch(new owedHoursActions.UpdateHours(Math.abs(Math.floor(extraMins))));
			} else {
				leftover = Math.abs(extraMins);
				minsUsed = currOwedMin;

				this.store.dispatch(new owedHoursActions.ResetHours());
			}

			this.store.dispatch(new AddSpentHour({
				hours: minsUsed,
				day: Date.now(),
				prevHours: currOwedMin,
				afterHours: this.extraHours.hours,
			}));

			this.storage.set("owedHours", this.owedHours)
				.then(() => console.log("extra hours used"))
				.catch(console.error);
		}

		return leftover;
	}

	private setupAd() {
		const id = (this.platform.is('android'))
			? environment.adId.android
			: environment.adId.ios;

		this.admobFree.banner.config({
			id,
			isTesting: !environment.production,
			autoShow: true,
			bannerAtTop: false
		});
	}

	private showAd() {
		this.admobFree.banner.show()
			.then(() => console.log("ad shown"))
			.catch(err => console.log("err showing ad: ", err));
	}

	private hideAd() {
		this.admobFree.banner.hide()
			.then(() => console.log("ad hidden"))
			.catch(err => console.log("err hiding ad: ", err));
	}

	private showToast(key: string) {
		this.events.publish("showToast", key);
	}
}
