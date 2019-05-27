import { NgModule } from '@angular/core';
import { CalcClockoutPipe } from './calc-clockout.pipe';

@NgModule({
    declarations: [CalcClockoutPipe],
    exports: [CalcClockoutPipe]
})
export class CalcClockoutModule { }
