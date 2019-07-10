import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/State';
import { SpentHour } from 'src/app/State/spentHours/spentHours.model';
import { SetOptions as SetHeader } from 'src/app/state/header/header.actions';

@Component({
	selector: 'app-spent-hours',
	templateUrl: './spent-hours.page.html',
	styleUrls: ['./spent-hours.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SpentHoursPage implements OnInit, OnDestroy {
	private sub: Subscription;

	hours: Observable<SpentHour>;
	dateFormat: string;

	constructor(private store: Store<AppState>) {
		this.hours = this.store.select("spentHours");
		this.store.dispatch(new SetHeader({ title: 'spentHours.title' }));
	}

	ngOnInit() {
		this.sub = this.store.select("settings").subscribe(({ selectedDateFormat }) => this.dateFormat = selectedDateFormat.key);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}