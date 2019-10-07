import { Component, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "app-reset-modal",
	templateUrl: "./reset-modal.component.html",
	styleUrls: ["./reset-modal.component.scss"],
})
export class ResetModalComponent {
	@Output() onCancel: EventEmitter<void>;
	@Output() onSubmit: EventEmitter<void>;

	constructor() {
		this.onCancel = new EventEmitter();
		this.onSubmit = new EventEmitter();
	}

	triggerSubmit() {
		this.onSubmit.emit();
	}

	triggerCancel() {
		this.onCancel.emit();
	}
}
