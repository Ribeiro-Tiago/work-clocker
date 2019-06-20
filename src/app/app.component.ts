import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { AdMobFree } from '@ionic-native/admob-free/ngx';

import { StorageService } from './services/storage/storage.service';

import { environment } from 'src/environments/environment';

import { Update as UpdateSettings } from "./state/settings/settings.actions";
import { SetHours as SetExtraHours } from "./state/extraHours/extraHours.actions";
import { SetHours as SetOwedHours } from "./state/owedHours/owedHours.actions";
import { SetHours as SetClockedHours } from "./state/clockedHours/clockedHours.actions";
import { SetHours as SetSpentHours } from "./state/spentHours/spentHours.actions";
import { SetTutorial } from "./state/tutorial/tutorial.actions";

import { AppState } from './State';
import { Tutorial } from './State/tutorial/tutorial.model';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	private sub: Subscription;
	private tutObs: Observable<Tutorial>;

	isTutVisible: boolean;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private translate: TranslateService,
		private storage: StorageService,
		private store: Store<AppState>,
		private admobFree: AdMobFree
	) {
		this.isTutVisible = false;
		this.tutObs = this.store.select("tutorial");
	}

	ngOnInit() {
		this.platform.ready().then(async () => {
			Promise.all([
				this.storage.get("extraHours"),
				this.storage.get("owedHours"),
				this.storage.get("spentHours"),
				this.storage.get("settings"),
				this.storage.get("clockedHours"),
				this.storage.get("tutorial"),
			]).then(results => {
				const extraHours = results[0];
				const owedHours = results[1];
				const spentHours = results[2];
				const settings = results[3];
				const clockedHours = results[4];
				const tutorial = results[5];

				if (extraHours) {
					this.store.dispatch(new SetExtraHours(extraHours));
				}

				if (owedHours) {
					this.store.dispatch(new SetOwedHours(owedHours));
				}

				if (spentHours) {
					this.store.dispatch(new SetSpentHours(spentHours));
				}

				if (settings) {
					const { selectedDateFormat, selectedLanguage, selectedLunchDuration, selectedWorkDuration } = settings;

					this.store.dispatch(new UpdateSettings({
						selectedDateFormat,
						selectedLanguage,
						selectedLunchDuration,
						selectedWorkDuration
					}));
				}

				if (clockedHours) {
					this.store.dispatch(new SetClockedHours({
						hours: clockedHours,
						isActive: clockedHours[0].isActive
					}));
				}

				if (tutorial) {
					this.store.dispatch(new SetTutorial(spentHours));
				}
			});

			this.sub = this.tutObs.subscribe(({ isVisible }: Tutorial) => this.isTutVisible = isVisible);

			this.statusBar.styleLightContent();
			this.splashScreen.hide();
			this.translate.setDefaultLang("en_US");

			this.setupAd();
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	async setupAd() {
		const id = (this.platform.is('android'))
			? environment.adId.android
			: environment.adId.ios;

		this.admobFree.banner.config({
			isTesting: !environment.production,
			autoShow: true,
			id: "ca-app-pub-5810216903508681/4089183083",
			bannerAtTop: false
		});

		this.admobFree.banner.prepare()
			.then(() => console.log("ad visible"))
			.catch(e => console.log("err showing add: ", e));
	}
}
