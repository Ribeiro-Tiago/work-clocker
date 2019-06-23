import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: './pages/home/home.module#HomePageModule' },
	{ path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
	{ path: 'hours-spent', loadChildren: './pages/spent-hours/spent-hours.module#SpentHoursPageModule' },
	{ path: 'spent-hours', loadChildren: './pages/spent-hours/spent-hours.module#SpentHoursPageModule' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
