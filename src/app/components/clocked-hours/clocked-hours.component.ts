import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Events } from '@ionic/angular';
import { Subscription, Observable } from 'rxjs';

import { Tutorial, TutorialStage } from 'src/app/state/tutorial/tutorial.model';
import { AppState } from 'src/app/State';
import { ClockedHour as StateClockedHour } from 'src/app/state/clockedHours/clockedHours.model';
import { ClockedHour } from 'src/app/types/Hour';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UpdateHours as UpdateHoursAction } from "src/app/state/clockedHours/clockedHours.actions";


@Component({
	selector: 'app-clocked-hours',
	templateUrl: './clocked-hours.component.html',
	styleUrls: ['./clocked-hours.component.scss'],
})
export class ClockedHoursComponent implements OnInit {
	private subs: Subscription[];
	private tutObs: Observable<Tutorial>;
	private clockedHoursObs: Observable<StateClockedHour>;

	isTutVisible: boolean;
	tutStage: TutorialStage;

	clockedHours: ClockedHour[];

	isActiveClock: boolean;
	isModalVisible: boolean;

	constructor(private store: Store<AppState>, private storage: StorageService, private events: Events, ) {
		this.tutObs = store.select("tutorial");
		this.clockedHoursObs = store.select("clockedHours");
	}

	ngOnInit() {
		this.subs.push(
			this.tutObs.subscribe(({ isVisible, stage }: Tutorial) => {
				this.isTutVisible = isVisible;
				this.tutStage = stage;
			}),
			this.clockedHoursObs.subscribe((result: StateClockedHour) => {
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
