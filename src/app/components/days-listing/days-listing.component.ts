import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DayListItem } from 'src/types/DayList';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-days-listing',
	templateUrl: './days-listing.component.html',
	styleUrls: ['./days-listing.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DaysListingComponent implements OnInit {
	items: DayListItem[];
	isLoading: boolean;

	constructor(private storage: Storage) {
		this.items = [{
			day: 1,
			startHour: 1,
			hoursWorked: 1,
			endHour: 1,
			lunchDuration: 1,
			lunchStart: 1,
			lunchEnd: 1,
		}, {
			day: 1,
			startHour: 1,
			hoursWorked: 1,
			endHour: 1,
			lunchDuration: 1,
			lunchStart: 1,
			lunchEnd: 1,
		}];
		this.isLoading = true;
	}

	ngOnInit() {
		return;
		this.storage.get("workDay")
			.then(result => result && (this.items = result))
			.catch(console.error)
			.finally(() => this.isLoading = false);
	}

}
