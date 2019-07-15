import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

import { AppState } from 'src/app/State';

import { environment } from 'src/environments/environment.prod';

import { Setting } from 'src/app/state/settings/settings.model';
import { Tutorial, TutorialStage } from 'src/app/State/tutorial/tutorial.model';
import { ClockedHourItem } from 'src/app/state/clockedHours/clockedHours.model';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, OnDestroy {
	private subs: Subscription[];
	private settingsObs: Observable<Setting>;
	private tutObs: Observable<Tutorial>;

	lunchDuration: number;
	workDuration: number;
	dateFormat: string;

	tutStage: TutorialStage;
	tutItem: ClockedHourItem;

	isLoading: boolean;
	isTutVisible: boolean;

	isModalVisible: boolean;

	constructor(
		store: Store<AppState>,
		private admobFree: AdMobFree,
		private platform: Platform,
	) {
		this.settingsObs = store.select("settings");
		this.tutObs = store.select("tutorial");

		this.isLoading = true;
		this.isTutVisible = false;

		this.isModalVisible = false;

		this.setupAd();
	}

	ngOnInit(): void {
		this.subs = [
			this.settingsObs.subscribe((result: Setting) => this.lunchDuration = result.selectedLunchDuration),
			this.tutObs.subscribe(({ isVisible, stage }: Tutorial) => {
				this.isTutVisible = isVisible;
				this.tutStage = stage;

				if (!isVisible) {
					this.showAd();
				} else {
					this.hideAd();
				}
			})
		];
	}

	ngOnDestroy(): void {
		this.subs.forEach(sub => sub.unsubscribe());
	}

	toggleLunchUpdate(): void {
		this.isModalVisible = !this.isModalVisible;
	}

	private setupAd() {
		const id = (this.platform.is('android'))
			? environment.adId.android
			: environment.adId.ios;

		this.admobFree.banner.config({
			id,
			isTesting: !environment.production,
			autoShow: true,
			bannerAtTop: false
		});
	}

	private showAd() {
		this.admobFree.banner.show()
			.then(() => console.log("ad shown"))
			.catch(err => console.log("err showing ad: ", err));
	}

	private hideAd() {
		this.admobFree.banner.hide()
			.then(() => console.log("ad hidden"))
			.catch(err => console.log("err hiding ad: ", err));
	}
}
