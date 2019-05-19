import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DayListItem } from 'src/types/DayList';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-days-listing',
	templateUrl: './days-listing.component.html',
	styleUrls: ['./days-listing.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DaysListingComponent implements OnInit {
	items: DayListItem[];
	isLoading: boolean;

	constructor(private storage: Storage, private sanitizer: DomSanitizer) {
		this.items = [];
		this.isLoading = false;
	}

	sanitizeString = (string: string) => this.sanitizer.bypassSecurityTrustHtml(string);

	ngOnInit() {
		return;
		this.storage.get("workDay")
			.then(result => result && (this.items = result))
			.catch(console.error)
			.finally(() => this.isLoading = false);
	}

}
