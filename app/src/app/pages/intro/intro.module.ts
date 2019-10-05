import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IntroPage } from './intro.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([{
			path: '',
			component: IntroPage
		}])
	],
	declarations: [IntroPage]
})
export class IntroPageModule { }
