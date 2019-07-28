import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import langs from "src/configs/langs";
import { LangItem, GenericOption } from 'src/app/types/Misc';
import { AppState } from 'src/app/State';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UpdateLang as SetLango } from "src/app/state/settings/settings.actions";
import { SetIntro } from "src/app/state/intro/intro.actions";
import { ShowTut } from 'src/app/state/tutorial/tutorial.actions';
import configs from './configs';

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

	hoursVisible: boolean;
	hourPool: number;
	poolType: string;

	poolTypes: GenericOption[];

	constructor(
		private store: Store<AppState>,
		private translate: TranslateService,
		private storage: StorageService,
		private router: Router
	) {
		this.langs = langs;

		this.currLang = langs[0].key;

		this.hoursVisible = false;

		this.hourPool = 60;

		this.poolTypes = configs;

		this.poolType = configs[0].value;
	}

	onLangSelect(ev: Event, key: string): void {
		ev.preventDefault();

		this.currLang = key;
		this.translate.setDefaultLang(key);
		this.store.dispatch(new SetLango(this.langs.find(l => l.key === key)));
	}

	nextSlide(): void {
		this.slider.slideNext();
	}

	finishIntro(): void {
		this.store.dispatch(new ShowTut());
		this.store.dispatch(new SetIntro(true));
		this.storage.set("intro", true);
		this.router.navigate(["/home"], { replaceUrl: true });
	}

	togglePool(): void {
		this.hoursVisible = !this.hoursVisible;
	}
}
