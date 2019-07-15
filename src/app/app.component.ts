import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

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
import { SetOptions as SetHeader } from "src/app/State/header/header.actions";
import { SetIntro } from "src/app/State/intro/intro.actions";
import * as MenuActions from "src/app/state/menu/menu.actions";

import { AppState } from './State';
import { Tutorial } from './State/tutorial/tutorial.model';
import { Subscription, Observable, timer } from 'rxjs';
import { Setting } from './state/settings/settings.model';
import { SpentHour } from './state/spentHours/spentHours.model';
import { OwedHour } from './state/owedHours/owedHours.model';
import { ExtraHour } from './state/extraHours/extraHours.model';
import { ClockedHourItem } from './state/clockedHours/clockedHours.model';
import { Menu } from './State/menu/menu.model';
import { Header } from './State/header/header.model';
import { Intro } from './State/intro/intro.model';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	private subs: Subscription[];
	private tut$: Observable<Tutorial>;
	private menu$: Observable<Menu>;
	private intro$: Observable<Intro>;

	showSplash: boolean;

	isTutVisible: boolean;
	isMenuOpen: boolean;
	isIntroScreen: boolean;

	headerTitle: string;
	isHeaderVisible: boolean;
	headerBtnVisible: boolean;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private translate: TranslateService,
		private storage: StorageService,
		private store: Store<AppState>,
		private events: Events,
		private toastController: ToastController,
		private router: Router
	) {
		this.isTutVisible = false;
		this.isMenuOpen = false;
		this.isIntroScreen = true;
		this.showSplash = true;

		this.subs = [];

		this.tut$ = this.store.select("tutorial");
		this.menu$ = this.store.select("menu");
		this.intro$ = this.store.select("intro");

		this.isHeaderVisible = false;
		this.headerBtnVisible = false;
		this.headerTitle = "title";
	}

	ngOnInit(): void {
		this.platform.ready().then(async () => {
			this.splashScreen.hide();

			timer(3000).subscribe(() => this.showSplash = false);

			this.getStorageData();

			this.events.subscribe('showToast', (key: string) => this.showToast(key));

			this.subs.push(
				this.tut$.subscribe(({ isVisible }: Tutorial) => this.isTutVisible = isVisible),
				this.menu$.subscribe(({ isVisible }: Menu) => this.isMenuOpen = isVisible),
				this.intro$.subscribe(({ isDone }: Intro) => {
					this.isHeaderVisible = isDone;

					if (isDone) {
						this.router.navigate(["/home"], { replaceUrl: true });
					}
				}),
				this.router.events.subscribe((event) => this.onRouteChange(event))
			);

			this.statusBar.styleLightContent();
			this.translate.setDefaultLang("en_US");
		});
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
	}

	onContentClick(): void {
		if (this.isMenuOpen) {
			this.store.dispatch(new MenuActions.ToggleMenu());
		}
	}

	private getStorageData(): void {
		Promise.all([
			this.storage.get("extraHours"),
			this.storage.get("owedHours"),
			this.storage.get("spentHours"),
			this.storage.get("settings"),
			this.storage.get("clockedHours"),
			this.storage.get("tutorial"),
			this.storage.get("intro")
		]).then(results => {
			const extraHours: ExtraHour = results[0];
			const owedHours: OwedHour = results[1];
			const spentHours: SpentHour[] = results[2];
			const settings: Setting = results[3];
			const clockedHours: ClockedHourItem[] = results[4];
			const tutorial: Tutorial = results[5];
			const intro: Intro = results[6];

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

			if (intro) {
				this.store.dispatch(new SetIntro(true));
			}
		});
	}

	private onRouteChange(event: Event): void {
		if (event instanceof NavigationEnd) {
			let configs: Header = {
				showHeader: true,
				hideBackBtn: false
			};

			switch (event.url) {
				case "/":
					configs = { showHeader: false };
					break;

				case "/clocked-hours":
					configs = { ...configs, title: 'clockedHours.title' };
					break;

				case "/hours-spent":
					configs = { ...configs, title: 'spentHours.title' };
					break;

				case "/settings":
					configs = { ...configs, title: 'settings.title' };
					break;

				default:
					configs = { ...configs, hideBackBtn: true, title: "title" };
					break;
			}

			this.store.dispatch(new SetHeader(configs));
			this.store.dispatch(new MenuActions.CloseMenu());
		}
	}

	private async showToast(key: string): Promise<void> {
		const toast = await this.toastController.create({
			message: await this.translate.get(key).toPromise(),
			duration: 3000,
		});

		toast.present();
	}
}
