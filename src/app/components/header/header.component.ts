import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/State';
import { ClockedHour } from 'src/app/state/clockedHours/clockedHours.model';

import { Tutorial, TutorialStage } from 'src/app/state/tutorial/tutorial.model';
import { ClockerService } from 'src/app/services/clocker/clocker.service';

import { ToggleMenu } from "src/app/state/menu/menu.actions";
import { Header } from 'src/app/State/header/header.model';
import { SetOptions as SetHeader } from "src/app/State/header/header.actions";
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
	private subs: Subscription[];
	private clockedHours$: Observable<ClockedHour>;
	private tutorial$: Observable<Tutorial>;
	private header$: Observable<Header>;

	private isActiveClock: boolean;

	isTutVisible: boolean;
	tutStage: TutorialStage;

	title: string;
	showClockBtn: boolean;
	hideBackBtn: boolean;

	constructor(
		private store: Store<AppState>,
		private events: Events,
		private clocker: ClockerService,
		private router: Router,
		private translate: TranslateService
	) {
		this.clockedHours$ = store.select("clockedHours");
		this.tutorial$ = store.select("tutorial");
		this.header$ = store.select("header");

		this.subs = [];
	}

	ngOnInit() {
		this.subs.push(
			this.clockedHours$.subscribe((result: ClockedHour) => {
				this.isActiveClock = result.isActive;
			}),
			this.tutorial$.subscribe(({ isVisible, stage }: Tutorial) => {
				this.isTutVisible = isVisible;
				this.tutStage = stage;
			}),
			this.header$.subscribe(async ({ title, showClockBtn, hideBackBtn }: Header) => {
				this.title = await this.translate.get(title).toPromise();
				this.showClockBtn = showClockBtn;
				this.hideBackBtn = hideBackBtn;
			}),

		);
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
	}

	onBtnPress(): void {
		if (this.isActiveClock) {
			this.clockOut();
		} else {
			this.clockIn();
		}
	}

	clockIn(): void {
		this.clocker.clockIn();

		this.showToast("home.clockedIn");
	}

	clockOut(): void {
		this.clocker.clockOut();

		this.showToast("home.clockedOut");
	}

	toggleMenu(): void {
		this.store.dispatch(new ToggleMenu());
	}

	goBack(): void {
		this.router.navigate(["/"]);
		this.store.dispatch(new SetHeader({ showClockBtn: true, hideBackBtn: true, title: "title" }));
	}

	private showToast(key: string) {
		this.events.publish("showToast", key);
	}
}
