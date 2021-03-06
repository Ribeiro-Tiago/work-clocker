import { Component, ViewEncapsulation, Input, Output, EventEmitter } from "@angular/core";

import { ClockedHourItem } from "src/app/state/clockedHours/clockedHours.model";

@Component({
	selector: "app-list-item",
	templateUrl: "./list-item.component.html",
	styleUrls: ["./list-item.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class ListItemComponent {
	@Input() item: ClockedHourItem;
	@Input() dateFormat: string;
	@Input() lunchDuration: number;
	@Input() workDuration: number;

	@Output() onClick = new EventEmitter<boolean>();

	triggerOnClick() {
		this.onClick.emit(this.item.status !== 4);
	}
}
