import { Component, Output, EventEmitter } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Device } from "@ionic-native/device/ngx";
import { TranslateService } from "@ngx-translate/core";

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

	constructor(private appVersion: AppVersion, private device: Device, private translate: TranslateService) {
		this.topics = configs.topics;
		this.topic = configs.topics[0];

		this.onCancel = new EventEmitter();
	}

	async openEmail(): Promise<void> {
		const texts = await Promise.all([
			this.translate.get(this.topic.emailSubject).toPromise(),
			this.translate.get("feedback.problem_body").toPromise(),
		]);
		let body = "";

		if (this.topic.value === "problem") {
			body = `
				%0D%0A%0D%0A-------------------------
				%0D%0A${texts[1]}%0D%0A
				> App version: ${await this.appVersion.getVersionNumber()} / ${this.device.cordova}%0D%0A
				> System: ${this.device.platform}%0D%0A
				> System version: ${this.device.version}%0D%0A
				> Model: ${this.device.model}
			`;
		}

		window.location.href = `mailto:${configs.feedbackEmail}?subject=${texts[0]}&body=${body}`;
	}
	triggerCancel(): void {
		this.onCancel.emit();
	}
}
