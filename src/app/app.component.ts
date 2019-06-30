import { Component, OnInit } from '@angular/core';

import { Platform, Events, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { StorageService } from './services/storage/storage.service';

import { Update as UpdateSettings } from "./state/settings/settings.actions";
import { SetHours as SetExtraHours } from "./state/extraHours/extraHours.actions";
import { SetHours as SetOwedHours } from "./state/owedHours/owedHours.actions";
import { SetHours as SetClockedHours } from "./state/clockedHours/clockedHours.actions";
import { SetHours as SetSpentHours } from "./state/spentHours/spentHours.actions";
import { SetTutorial } from "./state/tutorial/tutorial.actions";

import { AppState } from './State';
import { Tutorial } from './State/tutorial/tutorial.model';
import { Subscription, Observable } from 'rxjs';
import { Setting } from './state/settings/settings.model';
import { SpentHour } from './state/spentHours/spentHours.model';
import { OwedHour } from './state/owedHours/owedHours.model';
import { ExtraHour } from './state/extraHours/extraHours.model';
import { ClockedHourItem } from './state/clockedHours/clockedHours.model';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	private sub: Subscription;
	private tutObs: Observable<Tutorial>;

	isTutVisible: boolean;
	isIntroScreen: boolean;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private translate: TranslateService,
		private storage: StorageService,
		private store: Store<AppState>,
		private events: Events,
		private toastController: ToastController
	) {
		this.isTutVisible = false;
		this.isIntroScreen = true;
		this.tutObs = this.store.select("tutorial");
	}

	ngOnInit() {
		this.platform.ready().then(async () => {
			this.getStorageData();

			this.events.subscribe('showToast', (key: string) => this.showToast(key));

			this.sub = this.tutObs.subscribe(({ isVisible }: Tutorial) => this.isTutVisible = isVisible);

			this.statusBar.styleLightContent();
			this.splashScreen.hide();
			this.translate.setDefaultLang("en_US");
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	private getStorageData() {
		Promise.all([
			this.storage.get("extraHours"),
			this.storage.get("owedHours"),
			this.storage.get("spentHours"),
			this.storage.get("settings"),
			this.storage.get("clockedHours"),
			this.storage.get("tutorial"),
		]).then(results => {
			const extraHours: ExtraHour = results[0];
			const owedHours: OwedHour = results[1];
			const spentHours: SpentHour[] = results[2];
			const settings: Setting = results[3];
			const clockedHours: ClockedHourItem[] = results[4];
			const tutorial: Tutorial = results[5];

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
				this.store.dispatch(new SetTutorial(tutorial));
			}
		});
	}

	private async showToast(key: string) {
		const toast = await this.toastController.create({
			message: await this.translate.get(key).toPromise(),
			duration: 3000,
		});

		toast.present();
	}
}
