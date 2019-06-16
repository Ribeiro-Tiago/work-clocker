import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { StorageService } from 'src/app/services/storage/storage.service';
import { ClockedHour } from 'src/app/types/Hour';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State';
import { OwedHours } from 'src/app/State/owedHours/owedHours.model';

import { AddHours as AddExtraHours } from "../../state/extraHours/extraHours.actions";
import { AddHours as AddOwedHours } from "../../state/owedHours/owedHours.actions";

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, OnDestroy {
	private subs: Subscription[];

	lunchDuration: number;
	workDuration: number;
	dateFormat: string;

	owedHoursObs: Observable<number>;
	extraHoursObs: Observable<number>;

	clockedHours: ClockedHour[];
	owedHours: number;
	extraHours: number;
	selectedDay?: number;
	selectedItemIndex: number;

	isLoading: boolean;
	onGoingClock: boolean;
	isModalVisible: boolean;

	constructor(private storage: StorageService, private sanitizer: DomSanitizer, private store: Store<AppState>) {
		this.owedHoursObs = store.select("owedHours");
		this.extraHoursObs = store.select("extraHours");
		this.isLoading = true;
		this.clockedHours = [];
		this.lunchDuration = 60;
		this.workDuration = 8;
		this.selectedDay = -1;
		this.onGoingClock = false;
		this.isModalVisible = false;
		this.dateFormat = "dd/mm/yyyy";
		this.selectedItemIndex = -1;
	}

	ngOnInit(): void {
		this.subs = [
			this.owedHoursObs.subscribe((result) => this.owedHours = result),
			this.extraHoursObs.subscribe((result) => this.extraHours = result),
		];

		/* // this.storage.clear().catch(console.log);

		Promise.all([
			this.storage.get("owedHours"),
			this.storage.get("extraHours"),
			this.storage.get("settings"),
			this.storage.get("clockedHours"),
			// this.storage.delete("clockedHours"),
		])
			.then((result) => {
				this.owedHours = parseInt(result[0]) | 0;
				this.extraHours = parseInt(result[1]) | 0;
				const settings = result[2];
				const clockedHours = result[3];

				if (settings) {
					const { lunchDuration, workDuration, dateFormat } = settings;

					this.lunchDuration = lunchDuration;
					this.workDuration = workDuration;
					this.dateFormat = dateFormat;
				}

				if (clockedHours) {
					console.log(clockedHours);
					this.clockedHours = clockedHours;
					this.onGoingClock = clockedHours[0].onGoing;
				}

				this.isLoading = false;
			})
			.catch(console.error); */
	}

	ngOnDestroy(): void {
		this.subs.forEach(sub => sub.unsubscribe());
	}

	onBtnPress(): void {
		if (this.onGoingClock) {
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
			onGoing: true,
			lunchDuration: this.lunchDuration
		};
		this.onGoingClock = true;

		this.storage.update("clockedHours", item)
			.then(() => console.log("added hour"))
			.catch((err) => console.log("err adding hour: ", err));

		this.clockedHours.splice(0, 0, item);
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
		currItem.onGoing = false;

		/* worked less hours than expected, is now owing hours */
		if (timeWorkedDiff < 0) {
			this.store.dispatch(new AddOwedHours((timeWorkedDiff * -1) - timeWorked));

			await this.storage.update("owedHours", this.owedHours);
			console.log("owed hours updated: ", this.owedHours);
		} else if (timeWorkedDiff > 0) { /* worked more hours than expected, now has extra hours */
			this.store.dispatch(new AddExtraHours(timeWorked));

			await this.storage.update("extraHours", this.extraHours);
			console.log("extra hours updated: ", this.extraHours);
		}

		await this.storage.set("clockedHours", this.clockedHours);
		console.log("updated hour");

		this.onGoingClock = false;
	}

	toggleLunchUpdate(index = -1): void {
		this.isModalVisible = !this.isModalVisible;
		this.selectedItemIndex = index;
	}

	updateLunchTime({ duration, index }): void {
		this.clockedHours[index].lunchDuration = duration;

		this.storage.set("clockedHours", this.clockedHours)
			.then(() => console.log("updated hour"))
			.catch((err) => console.log("err updating hour: ", err));

		this.toggleLunchUpdate();
	}

	sanitizeString = (string: string): SafeHtml => this.sanitizer.bypassSecurityTrustHtml(string);
}
