import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/State';

import { Tutorial, TutorialStage } from 'src/app/state/tutorial/tutorial.model';

import { ToggleMenu } from "src/app/state/menu/menu.actions";
import { Header } from 'src/app/State/header/header.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
	private subs: Subscription[];
	private tutorial$: Observable<Tutorial>;
	private header$: Observable<Header>;

	isTutVisible: boolean;
	tutStage: TutorialStage;

	title: string;
	hideBackBtn: boolean;

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private translate: TranslateService
	) {
		this.tutorial$ = store.select("tutorial");
		this.header$ = store.select("header");

		this.subs = [];
	}

	ngOnInit() {
		this.subs.push(
			this.tutorial$.subscribe(({ isVisible, stage }: Tutorial) => {
				this.isTutVisible = isVisible;
				this.tutStage = stage;
			}),
			this.header$.subscribe(async ({ title, hideBackBtn }: Header) => {
				if (title) {
					this.title = await this.translate.get(title).toPromise();
					this.hideBackBtn = hideBackBtn;
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
	}

	toggleMenu(): void {
		this.store.dispatch(new ToggleMenu());
	}

	goBack(): void {
		this.router.navigate(["/home"]);
	}
}
