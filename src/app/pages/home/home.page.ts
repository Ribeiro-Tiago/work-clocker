import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { StorageService } from 'src/app/services/storage/storage.service';
import { ClockedHour } from 'src/app/types/Hour';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
	lunchDuration: number;
	workDuration: number;
	dateFormat: string;

	clockedHours: ClockedHour[];
	totalHours: number;
	extraHours: number;
	selectedDay?: number;
	selectedItemIndex: number;

	isLoading: boolean;
	onGoingClock: boolean;
	isModalVisible: boolean;

	constructor(private storage: StorageService, private sanitizer: DomSanitizer) {
		this.totalHours = 0;
		this.extraHours = 0;
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
		Promise.all([
			this.storage.get("totalHours"),
			this.storage.get("extraHours"),
			this.storage.get("settings"),
			this.storage.get("clockedHours"),
			// this.storage.delete("clockedHours"),
		])
			.then((result) => {
				this.totalHours = parseInt(result[0]) | 0;
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
			.catch(console.error);
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

	clockOut(): void {
		const currItem = this.clockedHours[0];
		const d = Date.now();
		currItem.endHour = d;
		currItem.hoursWorked = Math.ceil((d - currItem.startHour) / 60000);
		currItem.onGoing = false;
		this.onGoingClock = false;

		this.storage.add("clockedHours", this.clockedHours)
			.then(() => console.log("updated hour"))
			.catch((err) => console.log("err updating hour: ", err));
	}

	toggleLunchUpdate(index = -1): void {
		this.isModalVisible = !this.isModalVisible;
		this.selectedItemIndex = index;
	}

	updateLunchTime({ duration, index }): void {
		this.clockedHours[index].lunchDuration = duration;

		this.storage.add("clockedHours", this.clockedHours)
			.then(() => console.log("updated hour"))
			.catch((err) => console.log("err updating hour: ", err));

		this.toggleLunchUpdate();
	}

	sanitizeString = (string: string): SafeHtml => this.sanitizer.bypassSecurityTrustHtml(string);
}
