import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomePage {
	totalHours: number;
	extraHours: number;

	constructor() {
		this.totalHours = 0;
		this.extraHours = 0;
	}
}
