import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { Platform } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage/storage.service';
import { ClockedHour } from 'src/app/types/Hour';
import { ClockedHour as StateClockedHour } from 'src/app/State/clockedHours/clockedHours.model';
import { AppState } from 'src/app/State';

import { environment } from 'src/environments/environment';

import * as extraHoursActions from "../../state/extraHours/extraHours.actions";
import * as owedHoursActions from "../../state/owedHours/owedHours.actions";
import * as clockedActions from "../../state/clockedHours/clockedHours.actions";
import { AddHours as AddSpentHour } from "../../state/spentHours/spentHours.actions";

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
	private isAdVisible: boolean;

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
		private sanitizer: DomSanitizer,
		private store: Store<AppState>,
		private admobFree: AdMobFree,
		private platform: Platform,
		private router: Router,
	) {
		this.owedHoursObs = store.select("owedHours");
		this.extraHoursObs = store.select("extraHours");
		this.clockedHoursObs = store.select("clockedHours");
		this.settingsObs = store.select("settings");
		this.tutObs = store.select("tutorial");

		this.isAdVisible = true;

		this.router.events.subscribe((ev: any) => {
			if (ev instanceof NavigationEnd) {
				if (ev.url === "/settings" && this.isAdVisible) {
					this.hideAd();
				} else if (ev.url === "/home" && !this.isAdVisible) {
					this.showAd();
				}
			}
		});

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
		const d = new Date();
		const item: ClockedHour = {
			day: d.getTime(),
			startHour: d.getTime(),
			isActive: true,
			lunchDuration: this.lunchDuration
		};

		this.store.dispatch(new clockedActions.AddHour(item));

		this.storage.update("clockedHours", item)
			.then(() => console.log("added hour"))
			.catch((err) => console.log("err adding hour: ", err));
	}

	clockOut(): void {
		const currItem = this.clockedHours[0];
		const d = Date.now();
		let timeWorked = ((d - currItem.startHour) / 1000) - (currItem.lunchDuration * 60);
		const hoursWorked = Math.abs(Math.floor(timeWorked / 3600));
		const minutesWorked = Math.abs(Math.floor((timeWorked % 3600) / 60));
		const timeWorkedDiff = (hoursWorked - this.workDuration);

		timeWorked = (hoursWorked * 60) + minutesWorked;

		currItem.endHour = d;
		currItem.timeWorked = timeWorked;
		currItem.isActive = false;

		if (timeWorkedDiff < 0) {
			/* worked less hours than expected, use extra hours / check how many hours owed now */
			const owedHours = this.useExtraHours(Math.abs(timeWorkedDiff) * 60 - timeWorked);

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
		this.clockedHours[0].lunchDuration = duration;

		this.store.dispatch(new clockedActions.UpdateHours({
			hours: this.clockedHours,
			isActive: this.activeClock
		}));

		this.storage.set("clockedHours", this.clockedHours)
			.then(() => console.log("updated lunch hour"))
			.catch((err) => console.log("err updating hour: ", err));

		this.toggleLunchUpdate();
	}

	sanitizeString = (string: string): SafeHtml => this.sanitizer.bypassSecurityTrustHtml(string);

	private useExtraHours(owed: number): number {
		const currExtraHours = this.extraHours.hours;
		let leftover = owed;

		if (currExtraHours > 0) {
			const extraHours = currExtraHours - owed;
			let hoursUsed = 0;

			if (extraHours < 0) {
				leftover = extraHours * -1;
				hoursUsed = currExtraHours;

				this.store.dispatch(new extraHoursActions.ResetHours());
			} else {
				leftover = 0;
				hoursUsed = owed;

				this.store.dispatch(new extraHoursActions.UpdateHours(extraHours));
			}

			this.store.dispatch(new AddSpentHour({
				hours: hoursUsed,
				day: Date.now(),
				prevHours: currExtraHours,
				afterHours: this.extraHours.hours,
			}));

			this.storage.set("extraHours", this.extraHours)
				.then(() => console.log("extra hours used"))
				.catch(console.error);
		}

		return leftover;
	}

	private payOwedHours(extraWorked: number): number {
		extraWorked = 1800;

		const currOwedHours = this.owedHours.hours;
		let leftover = extraWorked;

		if (currOwedHours > 0) {
			/* ver se as horas extra cobrem as owed */
			const extraHours = currOwedHours - extraWorked;
			let hoursUsed = 0;

			/* se não */
			if (extraHours > 0) {
				leftover = 0;
				hoursUsed = extraWorked;

				this.store.dispatch(new extraHoursActions.ResetHours());
				this.store.dispatch(new owedHoursActions.UpdateHours(Math.abs(Math.floor(extraHours))));
			} else {
				leftover = Math.abs(extraHours);
				hoursUsed = currOwedHours;

				this.store.dispatch(new owedHoursActions.ResetHours());
			}

			this.store.dispatch(new AddSpentHour({
				hours: hoursUsed,
				day: Date.now(),
				prevHours: currOwedHours,
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

		this.admobFree.banner.prepare()
			.then(() => console.log("ad visible"))
			.catch(e => console.log("err showing add: ", e));
	}

	private hideAd() {
		try {
			this.admobFree.banner.hide();
			this.isAdVisible = false;
			// tslint:disable-next-line: no-empty
		} catch (ex) { }
	}

	private showAd() {
		try {
			this.admobFree.banner.show();
			this.isAdVisible = true;
			// tslint:disable-next-line: no-empty
		} catch (ex) { }

	}
}
