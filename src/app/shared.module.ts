import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderModule } from './components/header/header.module';
import { ConvertTimeModule } from './pipes/convert-time/convert-time.pipe.module';
import { SanitizerModule } from './pipes/sanitizer/sanitizer.pipe.module';
import { FormatTimeModule } from './pipes/format-time/format-time.pipe.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConvertTimeModule,
        HeaderModule,
        FormatTimeModule,
        SanitizerModule,
        TranslateModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConvertTimeModule,
        FormatTimeModule,
        HeaderModule,
        SanitizerModule,
        TranslateModule,
    ]
})
export class SharedModule { }