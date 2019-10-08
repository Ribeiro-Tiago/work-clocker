import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "src/app/state";
import { SpentHour } from "src/app/state/spentHours/spentHours.model";

import Analytics from "src/app/utils/Analytics";
import { SPENT_HOURS } from "src/configs/analytics";

@Component({
	selector: "app-spent-hours",
	templateUrl: "./spent-hours.page.html",
	styleUrls: ["./spent-hours.page.scss"],
	encapsulation: ViewEncapsulation.None
})
export class SpentHoursPage extends Analytics implements OnInit, OnDestroy {
	private sub: Subscription;

	hours: Observable<SpentHour>;
	dateFormat: string;

	constructor(private store: Store<AppState>) {
		super(SPENT_HOURS);

		this.hours = this.store.select("spentHours");
	}

	ngOnInit() {
		this.sub = this.store.select("settings").subscribe(({ selectedDateFormat }) => this.dateFormat = selectedDateFormat.key);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
