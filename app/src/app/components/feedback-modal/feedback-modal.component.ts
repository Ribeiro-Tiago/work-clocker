import { Component } from "@angular/core";
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
	topic: FeedBackTopic;
	topics: FeedBackTopic[];

	constructor(private appVersion: AppVersion, private device: Device) {
		this.topics = configs;
	}

	openEmail(subject: string): void {
		window.location.href = `mailto:support@tiago-ribeiro.com?subject=${subject}&body=message%20goes%20here`;
	}
}
