import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Menu } from 'src/app/state/menu/menu.model';
import { AppState } from 'src/app/State';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit, OnDestroy {
	private sub: Subscription;
	private menu$: Observable<Menu>;

	isVisible: boolean;

	constructor(store: Store<AppState>) {
		this.menu$ = store.select("menu");

		this.isVisible = false;
	}

	ngOnInit() {
		this.sub = this.menu$.subscribe((result: Menu) => this.isVisible = result.isVisible);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
