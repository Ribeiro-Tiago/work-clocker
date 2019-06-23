import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as TutActions from "src/app/State/tutorial/tutorial.actions";
import { AppState } from 'src/app/State';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.page.html',
	styleUrls: ['./intro.page.scss'],
})
export class IntroPage {

	constructor(private router: Router, private store: Store<AppState>, private storage: StorageService) { }

	goHome() {
		this.store.dispatch(new TutActions.ReadIntro());

		this.storage.set("tutorial", { isIntroVisible: false })
			.then(() => this.router.navigate(["/home"]));
	}
}
