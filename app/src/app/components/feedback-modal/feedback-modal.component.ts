import { Component, Output, EventEmitter } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Device } from "@ionic-native/device/ngx";

import configs from "./configs";

import { FeedBackTopic } from "src/app/types/Misc";

@Component({
	selector: "app-feedback-modal",
	templateUrl: "./feedback-modal.component.html",
	styleUrls: ["./feedback-modal.component.scss"],
})
export class FeedbackModalComponent {
	@Output() onCancel: EventEmitter<void>;

	topic: FeedBackTopic;
	topics: FeedBackTopic[];

	constructor(private appVersion: AppVersion, private device: Device) {
		this.topics = configs.topics;

		this.onCancel = new EventEmitter();
	}

	openEmail(subject: string): void {
		window.location.href = `mailto:${configs.feedbackEmail}?subject=${subject}&body=message%20goes%20here`;
	}

	triggerCancel(): void {
		this.onCancel.emit();
	}
}
