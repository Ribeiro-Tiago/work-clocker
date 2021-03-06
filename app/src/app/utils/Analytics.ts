import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";

// https://ionicframework.com/docs/native/firebase-analytics/
export default class Analytics {
	private analytics: FirebaseAnalytics;

	constructor(page: string) {
		this.analytics = new FirebaseAnalytics();

		this.analytics.setCurrentScreen(page);
	}

	log(name: string, params?: object | string | boolean | number): void {
		this.analytics.logEvent(name, params);
	}
}
