import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage/storage.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private translate: TranslateService,
		private storage: StorageService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(async () => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.translate.setDefaultLang("en_US");

			await Promise.all([
				this.storage.addIfNotExists("extraHours", 0),
				this.storage.addIfNotExists("owedHours", 0)
			]);
		});
	}
}
