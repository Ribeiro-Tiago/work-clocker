import { Component, ViewEncapsulation, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Events } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AppState } from "src/app/state";
import { StorageService } from "src/app/services/storage/storage.service";
import { ClockedHour } from "src/app/state/clockedHours/clockedHours.model";
import { UpdateHours as UpdateHoursAction } from "src/app/state/clockedHours/clockedHours.actions";

import configs from "src/app/pages/settings/configs";
@Component({
	selector: "app-update-lunch-modal",
	templateUrl: "./update-lunch-modal.component.html",
	styleUrls: ["./update-lunch-modal.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class UpdateLunchModalComponent implements OnInit {
	@Input() index: number;
	@Input() currDuration: number;

	@Output() onCancel: EventEmitter<void>;
	@Output() onSubmit: EventEmitter<number>;

	private sub: Subscription;
	private clockedHours: ClockedHour;

	selectedDuration: number;
	lunchDurations: number[];

	constructor(private store: Store<AppState>, private events: Events, private storage: StorageService) {
		this.lunchDurations = configs.lunchDuration;

		this.onCancel = new EventEmitter();
		this.onSubmit = new EventEmitter();

		this.sub = null;
		this.clockedHours = null;
	}

	ngOnInit(): void {
		this.selectedDuration = this.currDuration;

		this.sub = this.store.select("clockedHours").subscribe(result => {
			this.clockedHours = result;

			if (result.hours[0]) {
				this.selectedDuration = result.hours[0].lunchDuration;
			}
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	triggerCancel() {
		this.onCancel.emit();
		this.selectedDuration = this.currDuration;
	}

	onLunchChange(minute: number) {
		this.selectedDuration = minute;
	}

	updateLunchTime(): void {
		if (this.currDuration === this.selectedDuration) {
			this.onSubmit.emit();
			return;
		}

		this.clockedHours.hours[0].lunchDuration = this.selectedDuration;

		this.events.publish("showToast", "listItem.lunchHourUpdated");

		console.log(this.clockedHours);
		this.store.dispatch(new UpdateHoursAction({ ...this.clockedHours }));

		this.storage.set("clockedHours", this.clockedHours)
			.then(() => console.log("updated lunch hour"))
			.catch((err) => console.log("err updating hour: ", err));

		this.onSubmit.emit();
	}
}
