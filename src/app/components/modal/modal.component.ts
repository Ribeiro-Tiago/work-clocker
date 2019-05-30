import { Component, ViewEncapsulation, Input } from '@angular/core';

import configs from 'src/app/pages/settings/configs';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
	@Input() isVisible: boolean;
	@Input() currentDuration: number;
	@Input() onCancel: () => void;
	@Input() onSubmit: (newDuration: number) => void;

	selectedNum: number;
	lunchDuration: number[];

	constructor() {
		this.selectedNum = -1;

		this.lunchDuration = configs.lunchDuration;
	}

	triggerSubmit() {
		this.onSubmit(this.selectedNum);
	}

	onLunchChange(minute: number) {
		this.selectedNum = minute;
	}
}
