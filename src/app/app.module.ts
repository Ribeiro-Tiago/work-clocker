import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { MenuComponent } from './components/menu/menu.component';

import { AppRoutingModule } from './app-routing.module';

import { HomePageModule } from './pages/home/home.module';
import { SettingsPageModule } from './pages/settings/settings.module';

import { StorageService } from './services/storage/storage.service';

import { reducers } from './State';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { environment } from 'src/environments/environment';
import { SanitizerModule } from './pipes/sanitizer/sanitizer.pipe.module';
import { HeaderModule } from './components/header/header.module';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
	declarations: [
		AppComponent,
		TutorialComponent,
		MenuComponent
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HeaderModule,
		HttpClientModule,
		HomePageModule,
		SettingsPageModule,
		SanitizerModule,
		IonicStorageModule.forRoot({
			name: '__work-clocker__',
			driverOrder: ['indexeddb', 'sqlite', 'websql']
		}),
		StoreModule.forRoot(reducers),
		StoreDevtoolsModule.instrument({
			features: { pause: environment.production },
			maxAge: 25, // Retains last 25 states
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		})
	],
	providers: [
		StatusBar,
		SplashScreen,
		StorageService,
		IonicStorageModule,
		AdMobFree,
		{
			provide: RouteReuseStrategy,
			useClass: IonicRouteStrategy
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
