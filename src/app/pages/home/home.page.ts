import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { StorageService } from 'src/app/services/storage/storage.service';
import { ClockedHour } from 'src/app/types/Hour';
import { ClockedHour as StateClockedHour } from 'src/app/State/clockedHours/clockedHours.model';
import { AppState } from 'src/app/State';

import { AddHours as AddExtraHours } from "../../state/extraHours/extraHours.actions";
import { AddHours as AddOwedHours } from "../../state/owedHours/owedHours.actions";
import * as clockedActions from "../../state/clockedHours/clockedHours.actions";
import { Setting } from 'src/app/state/settings/settings.model';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, OnDestroy {
	private subs: Subscription[];
	private owedHoursObs: Observable<number>;
	private extraHoursObs: Observable<number>;
	private clockedHoursObs: Observable<StateClockedHour>;
	private settingsObs: Observable<Setting>;

	lunchDuration: number;
	workDuration: number;
	dateFormat: string;

	clockedHours: ClockedHour[];
	owedHours: number;
	extraHours: number;
	selectedDay?: number;
	selectedItemIndex: number;

	isLoading: boolean;
	activeClock: boolean;
	isModalVisible: boolean;

	constructor(private storage: StorageService, private sanitizer: DomSanitizer, private store: Store<AppState>) {
		this.owedHoursObs = store.select("owedHours");
		this.extraHoursObs = store.select("extraHours");
		this.clockedHoursObs = store.select("clockedHours");
		this.settingsObs = store.select("settings");

		this.isLoading = true;
		this.selectedDay = -1;
		this.isModalVisible = false;
		this.selectedItemIndex = -1;
	}

	ngOnInit(): void {
		this.subs = [
			this.owedHoursObs.subscribe((result: number) => this.owedHours = result),
			this.extraHoursObs.subscribe((result: number) => this.extraHours = result),
			this.clockedHoursObs.subscribe((result: StateClockedHour) => {
				this.activeClock = result.isActive;
				this.clockedHours = [...result.hours];
			}),
			this.settingsObs.subscribe((result: Setting) => {
				this.lunchDuration = result.selectedLunchDuration;
				this.workDuration = result.selectedWorkDuration;
				this.dateFormat = result.selectedDateFormat.key;
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

	async clockOut(): Promise<void> {
		const currItem = this.clockedHours[0];
		const d = Date.now();
		let timeWorked = (d - currItem.startHour) / 1000;
		const hoursWorked = Math.abs(Math.floor(timeWorked / 3600));
		const minutesWorked = Math.abs(Math.floor((timeWorked % 3600) / 60));
		const timeWorkedDiff = (hoursWorked - this.workDuration) * 60;

		timeWorked = (hoursWorked * 60) + minutesWorked;

		currItem.endHour = d;
		currItem.timeWorked = timeWorked;
		currItem.isActive = false;

		/* worked less hours than expected, is now owing hours */
		if (timeWorkedDiff < 0) {
			const owedHours = (timeWorkedDiff * -1) - timeWorked;

			this.store.dispatch(new AddOwedHours(owedHours));

			this.storage.update("owedHours", this.owedHours + owedHours)
				.then(() => console.log("owed hours updated: ", this.owedHours))
				.catch(console.error);
		} else if (timeWorkedDiff > 0) { /* worked more hours than expected, now has extra hours */
			this.extraHours += timeWorked;

			this.store.dispatch(new AddExtraHours(timeWorked));

			this.storage.update("extraHours", this.extraHours)
				.then(() => console.log("extra hours updated: ", this.extraHours))
				.catch(console.error);
		}

		this.store.dispatch(new clockedActions.UpdateHours({ hours: this.clockedHours, isActive: false }));

		this.storage.set("clockedHours", this.clockedHours)
			.then(() => console.log("updated hour"))
			.catch(console.error);
	}

	toggleLunchUpdate(index = -1): void {
		this.isModalVisible = !this.isModalVisible;
		this.selectedItemIndex = index;
	}

	updateLunchTime({ duration, index }): void {
		this.clockedHours[index].lunchDuration = duration;

		this.store.dispatch(new clockedActions.UpdateHours({ hours: this.clockedHours, isActive: this.activeClock }));

		this.storage.set("clockedHours", this.clockedHours)
			.then(() => console.log("updated hour"))
			.catch((err) => console.log("err updating hour: ", err));

		this.toggleLunchUpdate();
	}

	sanitizeString = (string: string): SafeHtml => this.sanitizer.bypassSecurityTrustHtml(string);
}
