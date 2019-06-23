import { NgModule } from '@angular/core';
import { SanitizerPipe } from './sanitizer.pipe';

@NgModule({
    declarations: [SanitizerPipe],
    exports: [SanitizerPipe]
})
export class SanitizerModule { }
