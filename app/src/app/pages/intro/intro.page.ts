import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

import configs from "../settings/configs";
import poolConfigs from "src/configs/hourPool";
import { LangItem, GenericOption, ConfigOption } from "src/app/types/Misc";
import { AppState } from "src/app/state";
import { StorageService } from "src/app/services/storage/storage.service";
import { UpdateLang as SetLango } from "src/app/state/settings/settings.actions";
import { SetIntro } from "src/app/state/intro/intro.actions";
import { SetPool as SetPoolHour } from "src/app/state/hourPool/hourPool.actions";
import { ShowTut } from "src/app/state/tutorial/tutorial.actions";
import { HourPool, PoolType } from "src/app/state/hourPool/hourPool.model";
import { Update as UpdateSettings } from "src/app/state/settings/settings.actions";

@Component({
	selector: "app-intro",
	templateUrl: "./intro.page.html",
	styleUrls: ["./intro.page.scss"],
	encapsulation: ViewEncapsulation.None
})
export class IntroPage {
	@ViewChild(IonSlides) slider: IonSlides;

	currLang: LangItem;
	lunchDuration: number;
	dateFormat: ConfigOption;
	lunchType: GenericOption;
	workDuration: number;

	langs: LangItem[];
	dateFormats: ConfigOption[];
	lunchTypes: GenericOption[];
	lunchDurations: number[];
	workDurations: number[];

	hoursVisible: boolean;
	hourPool: number;
	poolType: GenericOption;
	poolTypes: GenericOption[];

	constructor(
		private store: Store<AppState>,
		private translate: TranslateService,
		private storage: StorageService,
		private router: Router
	) {
		this.langs = configs.langs;
		this.dateFormats = configs.dateFormats;
		this.lunchDurations = configs.lunchDuration;
		this.workDurations = configs.workDuration;
		this.lunchTypes = configs.lunchTypes;
		this.poolTypes = poolConfigs;

		this.hoursVisible = false;

		this.hourPool = 60;
		this.poolType = poolConfigs[0];
		this.currLang = configs.langs[0];
		this.dateFormat = configs.dateFormats[0];
		this.lunchDuration = configs.lunchDuration[5];
		this.lunchType = configs.lunchTypes[0];
		this.workDuration = configs.workDuration[2];
	}

	onLangSelect(ev: Event, lang: LangItem): void {
		ev.preventDefault();

		this.currLang = lang;
		this.translate.setDefaultLang(lang.key);
		this.store.dispatch(new SetLango(this.currLang));
	}

	nextSlide(): void {
		this.slider.slideNext();
	}

	finishIntro(): void {
		const poolHour: HourPool = {
			hasPool: this.hoursVisible,
			poolType: this.poolType.value as PoolType,
			poolValue: this.hourPool,
			hoursLeft: this.hourPool * 60
		};
		const notifTime = configs.notifs.defaultTime;
		const settings = {
			selectedDateFormat: this.dateFormat,
			selectedLanguage: this.currLang,
			selectedLunchDuration: this.lunchDuration,
			selectedLunchType: this.lunchType,
			selectedWorkDuration: this.workDuration,
			clockinNotif: { ...notifTime },
			clockoutNotif: { ...notifTime },
			clockinLunchNotif: { ...notifTime },
			clockoutLunchNotif: { ...notifTime }
		};

		this.store.dispatch(new UpdateSettings(settings));
		this.store.dispatch(new SetPoolHour(poolHour));
		this.store.dispatch(new SetIntro(true));
		this.store.dispatch(new ShowTut());


		this.storage.set("intro", true);
		this.storage.set("poolHour", poolHour);
		this.storage.set("settings", settings);

		this.router.navigate(["/home"], { replaceUrl: true });
	}

	togglePool(): void {
		this.hoursVisible = !this.hoursVisible;
	}

	onDateSelect(key: string): void {
		this.dateFormat = this.dateFormats.find(d => d.key === key);
	}

	onWorkSelect(value: number): void {
		this.workDuration = value;
	}

	onLunchTypeSelect(value: string): void {
		this.lunchType = this.lunchTypes.find(t => t.value === value);
	}

	onLunchHourSelect(value: number): void {
		this.lunchDuration = value;
	}
}
