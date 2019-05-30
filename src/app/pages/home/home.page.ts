import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
	}

	ngOnInit() {
		Promise.all([
			this.storage.get("totalHours"),
			this.storage.get("extraHours"),
			this.storage.get("settings"),
			this.storage.get("clockedHours"),
			this.storage.delete("clockedHours"),
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

	onBtnPress() {
		if (this.onGoingClock) {
			// something
		} else {
			this.clockIn();
		}
	}

	clockIn() {
		const d = new Date();
		const item: ClockedHour = {
			day: d.getTime(),
			startHour: d.getTime(),
			onGoing: true,
			lunchDuration: this.lunchDuration
		};

		this.storage.update("clockedHours", item)
			.then(() => console.log("added hour"))
			.catch((err) => console.log("err adding hour: ", err));

		if (this.clockedHours.length) {
			this.clockedHours.unshift();
			this.clockedHours.push(item);
			this.clockedHours.shift();
		} else {
			this.clockedHours.push(item);
		}
	}

	toggleLunchUpdate() {
		this.isModalVisible = !this.isModalVisible;
	}

	updateLunchTime(newDuration: number) {
		this.clockedHours[this.clockedHours.length - 1].lunchDuration = newDuration;

		this.storage.add("clockedHours", this.clockedHours)
			.then(() => console.log("updated hour"))
			.catch((err) => console.log("err updating hour: ", err));
	}

	sanitizeString = (string: string) => this.sanitizer.bypassSecurityTrustHtml(string);
}
