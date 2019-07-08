import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/State';
import { Tutorial } from 'src/app/State/tutorial/tutorial.model';
import * as TutorialActions from 'src/app/State/tutorial/tutorial.actions';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
	selector: 'app-tutorial',
	templateUrl: './tutorial.component.html',
	styleUrls: ['./tutorial.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TutorialComponent implements OnInit, OnDestroy {
	private sub: Subscription;
	private tutObs: Observable<Tutorial>;
	private tut: Tutorial;

	title: string;
	tutText: string;
	position: string;
	arrOffset: number;
	isVisible: boolean;
	isLastStage: boolean;
	isFirstStage: boolean;

	constructor(private store: Store<AppState>, private storage: StorageService) {
		this.tutObs = store.select("tutorial");
	}

	ngOnInit(): void {
		this.sub = this.tutObs.subscribe((tut: Tutorial) => {
			const { isVisible, isFirstStage, isLastStage, position, rightOffset, stage, title } = tut;
			this.tut = tut;

			this.tutText = `tutorial.${stage}`;
			this.title = `tutorial.${title}`;
			this.isVisible = isVisible;
			this.isLastStage = isLastStage;
			this.isFirstStage = isFirstStage;
			this.position = position;
			this.arrOffset = rightOffset;
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	onSkip() {
		this.store.dispatch(new TutorialActions.FinishTut());

		this.updateStorage();
	}

	onNext() {
		this.store.dispatch(new TutorialActions.NextStage());

		this.updateStorage();
	}

	onPrev() {
		this.store.dispatch(new TutorialActions.PrevStage());

		this.updateStorage();
	}

	private updateStorage(): void {
		this.storage.set("tutorial", this.tut)
			.then(() => console.log("tutorial storage updated"))
			.catch(console.error);
	}
}
