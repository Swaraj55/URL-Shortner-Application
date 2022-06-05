import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrGeneratorComponent } from './qr-generator.component';
import { QrGeneratorService } from './qr-generator.service';

@NgModule({
  declarations: [QrGeneratorComponent],
  imports: [
    CommonModule
  ],
  exports: [QrGeneratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [QrGeneratorService]
})
export class QrGeneratorModule { }
