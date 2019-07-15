import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import langs from "src/configs/langs";
import { LangItem } from 'src/app/types/Misc';
import { AppState } from 'src/app/State';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UpdateLang as SetLango } from "src/app/state/settings/settings.actions";
import { SetIntro } from "src/app/state/intro/intro.actions";
import { ShowTut } from 'src/app/state/tutorial/tutorial.actions';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.page.html',
	styleUrls: ['./intro.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class IntroPage {
	@ViewChild(IonSlides) slider: IonSlides;

	currLang: string;
	langs: LangItem[];

	constructor(
		private store: Store<AppState>,
		private translate: TranslateService,
		private storage: StorageService,
		private router: Router
	) {
		this.langs = langs;

		this.currLang = langs[0].key;
	}

	onLangSelect(ev: Event, key: string): void {
		ev.preventDefault();

		this.currLang = key;
		this.translate.setDefaultLang(key);
		this.store.dispatch(new SetLango(this.langs.find(l => l.key === key)));
	}

	next(): void {
		this.slider.slideNext();
	}

	finishIntro(): void {
		this.store.dispatch(new ShowTut());
		this.store.dispatch(new SetIntro(true));
		this.storage.set("intro", true);
		this.router.navigate(["/home"], { replaceUrl: true });
	}
}
