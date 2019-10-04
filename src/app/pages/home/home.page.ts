import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Platform } from "@ionic/angular";

import { AppState } from "src/app/State";

import { Setting } from "src/app/state/settings/settings.model";
import { Tutorial } from "src/app/state/tutorial/tutorial.model";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
	encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, OnDestroy {
	private subs: Subscription[];
	private settingsObs: Observable<Setting>;
	private tutObs: Observable<Tutorial>;

	lunchDuration: number;
	workDuration: number;
	dateFormat: string;

	tutStage: number;
	isTutVisible: boolean;

	isLoading: boolean;

	isModalVisible: boolean;

	isLunchManual: boolean;

	constructor(
		store: Store<AppState>,
		private platform: Platform,
	) {
		this.settingsObs = store.select("settings");
		this.tutObs = store.select("tutorial");

		this.isLoading = true;
		this.isTutVisible = false;

		this.isModalVisible = false;
	}

	ngOnInit(): void {
		this.subs = [
			this.settingsObs.subscribe((result: Setting) => {
				this.isLunchManual = result.selectedLunchType.value !== "auto";
				this.lunchDuration = result.selectedLunchDuration;
			}),
			this.tutObs.subscribe(({ isVisible, currStage }: Tutorial) => {
				this.isTutVisible = isVisible;
				this.tutStage = currStage;
			})
		];
	}

	ngOnDestroy(): void {
		this.subs.forEach(sub => sub.unsubscribe());
	}

	toggleLunchUpdate(): void {
		this.isModalVisible = !this.isModalVisible;
	}
}
