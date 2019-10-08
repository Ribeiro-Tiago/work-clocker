import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { OwedHourModalConf } from 'src/app/types/Misc';

@Component({
	selector: 'app-owed-hour-modal',
	templateUrl: './owed-hour-modal.component.html',
	styleUrls: ['./owed-hour-modal.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class OwedHourModalComponent {
	@Input() configs: OwedHourModalConf;

	@Output() onClick: EventEmitter<number>;

	constructor() {
		this.onClick = new EventEmitter();
	}

	triggerButton(type: number): void {
		this.onClick.emit(type);
	}
}
