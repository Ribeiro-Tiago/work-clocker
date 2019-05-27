import { Component, ViewEncapsulation, Input } from '@angular/core';

import { ClockedHour } from '../../types/Hour';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ListItemComponent {
	@Input() item: ClockedHour;
	@Input() dateFormat: string;
	@Input() lunchDuration: number;
	@Input() workDuration: number;
}
