import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { StorageService } from '../storage/storage.service';
import { AppState } from 'src/app/State';
import { ClockedHour, ClockedHourItem } from 'src/app/state/clockedHours/clockedHours.model';
import { ExtraHour } from 'src/app/state/extraHours/extraHours.model';
import { OwedHour } from 'src/app/state/owedHours/owedHours.model';

import * as extraHoursActions from "src/app/state/extraHours/extraHours.actions";
import * as owedHoursActions from "src/app/state/owedHours/owedHours.actions";
import * as clockedActions from "src/app/state/clockedHours/clockedHours.actions";
import { AddHours as AddSpentHour } from "src/app/state/spentHours/spentHours.actions";
import { Setting } from 'src/app/state/settings/settings.model';

@Injectable({
	providedIn: 'root'
})
export class ClockerService {
	private subs: Subscription[];

	private lunchDuration: number;
	private workDuration: number;
	private clockedHours: ClockedHourItem[];
	private extraHours: ExtraHour;
	private owedHours: OwedHour;

	private settings$: Observable<Setting>;
	private extraHours$: Observable<ExtraHour>;
	private owedHours$: Observable<OwedHour>;
	private clockedHours$: Observable<ClockedHour>;

	constructor(
		private storage: StorageService,
		private store: Store<AppState>,
	) {
		this.settings$ = store.select("settings");
		this.extraHours$ = store.select("extraHours");
		this.owedHours$ = store.select("owedHours");
		this.clockedHours$ = store.select("clockedHours");


		this.subs = [
			this.settings$.subscribe(({ selectedLunchDuration, selectedWorkDuration }) => {
				this.lunchDuration = selectedLunchDuration;
				this.workDuration = selectedWorkDuration;
			}),
			this.extraHours$.subscribe(result => this.extraHours = result),
			this.owedHours$.subscribe(result => this.owedHours = result),
			this.clockedHours$.subscribe(({ hours }) => this.clockedHours = hours),
		];
	}

	clockIn(): void {
		const d = Date.now();

		const item: ClockedHourItem = {
			day: d,
			startHour: d,
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
		console.log(d, currItem);
		const lunchSecs = (currItem.lunchDuration * 60000);
		let timeWorkedSecs = (d - currItem.startHour);

		if (lunchSecs <= timeWorkedSecs) {
			timeWorkedSecs -= lunchSecs;
		}

		timeWorkedSecs /= 1000;

		console.log("wokredsecs", timeWorkedSecs);
		const minutesWorked = Math.floor(timeWorkedSecs / 60);

		const timeWorkedDiff = Math.abs(Math.ceil(minutesWorked / 60)) - this.workDuration;

		console.log(Math.ceil(minutesWorked / 60), this.workDuration, timeWorkedDiff);

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

	unsubscribe(): void {
		this.subs.forEach(s => s.unsubscribe());
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
}
