import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Events } from '@ionic/angular';
import { Subscription, Observable } from 'rxjs';

import { Tutorial, TutorialStage } from 'src/app/state/tutorial/tutorial.model';
import { AppState } from 'src/app/State';
import { ClockedHour, ClockedHourItem } from 'src/app/state/clockedHours/clockedHours.model';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UpdateHours as UpdateHoursAction } from "src/app/state/clockedHours/clockedHours.actions";
import { Setting } from 'src/app/state/settings/settings.model';


@Component({
	selector: 'app-clocked-hours',
	templateUrl: './clocked-hours.component.html',
	styleUrls: ['./clocked-hours.component.scss'],
})
export class ClockedHoursComponent implements OnInit {
	private subs: Subscription[];
	private tut$: Observable<Tutorial>;
	private clockedHours$: Observable<ClockedHour>;
	private settings$: Observable<Setting>;

	isTutVisible: boolean;
	tutStage: TutorialStage;

	clockedHours: ClockedHourItem[];
	tutItem: ClockedHourItem;

	isActiveClock: boolean;
	isModalVisible: boolean;

	workDuration: number;
	dateFormat: string;

	constructor(private store: Store<AppState>, private storage: StorageService, private events: Events) {
		this.tut$ = store.select("tutorial");
		this.clockedHours$ = store.select("clockedHours");
		this.settings$ = store.select("settings");

		this.subs = [];

		this.workDuration = -1;
		this.dateFormat = "dd/mm/yyy";

		this.tutItem = {
			day: 1560893131236,
			startHour: 1560893131236,
			isActive: false,
			lunchDuration: 60,
			endHour: 1560921931236,
			timeWorked: 480
		};
	}

	ngOnInit() {
		this.subs.push(
			this.settings$.subscribe((result: Setting) => {
				this.workDuration = result.selectedWorkDuration;
				this.dateFormat = result.selectedDateFormat.key;
			}),
			this.tut$.subscribe(({ isVisible, stage }: Tutorial) => {
				this.isTutVisible = isVisible;
				this.tutStage = stage;
			}),
			this.clockedHours$.subscribe((result: ClockedHour) => {
				this.isActiveClock = result.isActive;
				this.clockedHours = [...result.hours];
			})
		);
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
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

		this.events.publish("showToast", "listItem.lunchHourUpdated");

		this.store.dispatch(new UpdateHoursAction({
			hours: this.clockedHours,
			isActive: this.isActiveClock
		}));

		this.storage.set("clockedHours", this.clockedHours)
			.then(() => console.log("updated lunch hour"))
			.catch((err) => console.log("err updating hour: ", err));
	}
}
