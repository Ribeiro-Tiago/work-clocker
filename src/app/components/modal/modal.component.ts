import { Component, ViewEncapsulation, Input, OnInit, Output, EventEmitter } from '@angular/core';

import configs from 'src/app/pages/settings/configs';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
	@Input() isVisible: boolean;
	@Input() currDuration: number;

	@Output() onCancel: EventEmitter<void>;
	@Output() onSubmit: EventEmitter<number>;

	selectedDuration: number;
	lunchDurations: number[];

	constructor() {
		this.lunchDurations = configs.lunchDuration;

		this.selectedDuration = this.lunchDurations[0];

		this.onCancel = new EventEmitter();
		this.onSubmit = new EventEmitter();
	}

	ngOnInit(): void {
		this.selectedDuration = this.currDuration;
	}

	triggerSubmit() {
		this.onSubmit.emit(this.selectedDuration);
	}

	triggerCancel() {
		this.onCancel.emit();
	}

	onLunchChange(minute: number) {
		this.selectedDuration = minute;
	}
}
