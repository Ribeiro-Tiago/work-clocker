import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Tutorial, TutorialStage } from "src/app/state/tutorial/tutorial.model";
import { OwedHour } from "src/app/state/owedHours/owedHours.model";
import { ExtraHour } from "src/app/state/extraHours/extraHours.model";
import { AppState } from "src/app/state";

@Component({
	selector: "app-owed-extra-hours",
	templateUrl: "./owed-extra-hours.component.html",
	styleUrls: ["./owed-extra-hours.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class OwedExtraHoursComponent implements OnInit {
	private subs: Subscription[];
	private tutObs: Observable<Tutorial>;
	private owedHoursObs: Observable<OwedHour>;
	private extraHoursObs: Observable<ExtraHour>;

	isTutVisible: boolean;
	tutStage: TutorialStage;

	owedHours: OwedHour;
	extraHours: ExtraHour;

	constructor(store: Store<AppState>) {
		this.tutObs = store.select("tutorial");
		this.owedHoursObs = store.select("owedHours");
		this.extraHoursObs = store.select("extraHours");

		this.subs = [];
	}

	ngOnInit() {
		this.subs.push(
			this.tutObs.subscribe(({ isVisible, stage }: Tutorial) => {
				this.isTutVisible = isVisible;
				this.tutStage = stage;
			}),
			this.owedHoursObs.subscribe((result: OwedHour) => this.owedHours = result),
			this.extraHoursObs.subscribe((result: ExtraHour) => this.extraHours = result)
		);
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
	}
}
