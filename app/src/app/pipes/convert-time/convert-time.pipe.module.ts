import { NgModule } from '@angular/core';
import { ConvertTimePipe } from './convert-time.pipe';

@NgModule({
    declarations: [ConvertTimePipe],
    exports: [ConvertTimePipe]
})
export class ConvertTimeModule { }
