import { Component, ViewEncapsulation, Input, OnInit, Output, EventEmitter } from '@angular/core';

import configs from 'src/app/pages/settings/configs';

@Component({
	selector: 'app-update-lunch-modal',
	templateUrl: './update-lunch-modal.component.html',
	styleUrls: ['./update-lunch-modal.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class UpdateLunchModalComponent implements OnInit {
	@Input() index: number;
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
		this.selectedDuration = this.currDuration;
	}

	triggerCancel() {
		this.onCancel.emit();
		this.selectedDuration = this.currDuration;
	}

	onLunchChange(minute: number) {
		this.selectedDuration = minute;
	}
}
