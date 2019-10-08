import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";

// https://ionicframework.com/docs/native/firebase-analytics/
export default class Analytics {
	constructor(private analytics: FirebaseAnalytics, page: string) {
		analytics.setCurrentScreen(page)
			.catch((err) => console.log("err setting current page: ", err));
	}

	log(name: string, params?: object): void {
		this.analytics.logEvent(name, params)
			.catch((err) => console.log("err logging event: ", err));
	}
}
