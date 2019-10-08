import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "src/app/state";
import { Tutorial } from "src/app/state/tutorial/tutorial.model";
import * as TutorialActions from "src/app/state/tutorial/tutorial.actions";
import { StorageService } from "src/app/services/storage/storage.service";
import { CloseMenu } from "src/app/state/menu/menu.actions";
import Analytics from "src/app/utils/Analytics";
import {
	P_TUTORIAL,
	EV_SKIP_TUTORIAL,
	EV_NEXT_TUTORIAL,
	EV_FINISH_TUTORIAL,
	EV_PREV_TUTORIAL
} from "src/configs/analytics";

@Component({
	selector: "app-tutorial",
	templateUrl: "./tutorial.component.html",
	styleUrls: ["./tutorial.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class TutorialComponent extends Analytics implements OnInit, OnDestroy {
	private sub: Subscription;
	private tut$: Observable<Tutorial>;
	private tut: Tutorial;

	private currStage: number; // analytics

	title: string;
	tutText: string;
	position: string;
	isVisible: boolean;
	isLastStage: boolean;
	isFirstStage: boolean;

	constructor(private store: Store<AppState>, private storage: StorageService) {
		super(P_TUTORIAL);

		this.tut$ = store.select("tutorial");

		this.tutText = `tutorial.intro`;
		this.title = `tutorial.introTitle`;
		this.position = "on-intro";
	}

	ngOnInit(): void {
		this.sub = this.tut$.subscribe((tut: Tutorial) => {
			const { isVisible, isFirstStage, isLastStage, position, stage, title, currStage } = tut;
			this.tut = tut;

			this.tutText = `tutorial.${stage}`;
			this.title = `tutorial.${title}`;
			this.isVisible = isVisible;
			this.isLastStage = isLastStage;
			this.isFirstStage = isFirstStage;
			this.position = position;
			this.currStage = currStage;
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	onSkip() {
		this.log(EV_SKIP_TUTORIAL);
		this.endTutorial();
	}

	onFinish() {
		this.log(EV_FINISH_TUTORIAL);
		this.endTutorial();
	}

	onNext() {
		this.log(EV_NEXT_TUTORIAL, this.currStage++);
		this.store.dispatch(new TutorialActions.NextStage());

		this.updateStorage();
	}

	onPrev() {
		this.log(EV_PREV_TUTORIAL, this.currStage--);
		this.store.dispatch(new TutorialActions.PrevStage());

		this.updateStorage();
	}

	private updateStorage(): void {
		this.storage.set("tutorial", this.tut)
			.then(() => console.log("tutorial storage updated"))
			.catch(console.error);
	}

	private endTutorial(): void {
		this.store.dispatch(new TutorialActions.FinishTut());
		this.store.dispatch(new CloseMenu());

		this.updateStorage();
	}
}
