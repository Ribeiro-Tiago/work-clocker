import { NgModule } from '@angular/core';
import { ConvertToHoursPipe } from './convert-to-hours.pipe';

@NgModule({
    declarations: [ConvertToHoursPipe],
    exports: [ConvertToHoursPipe]
})
export class ConverToHoursModule { }
