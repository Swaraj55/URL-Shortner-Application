import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrGeneratorComponent } from './qr-generator.component';
import { QrGeneratorService } from './qr-generator.service';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [QrGeneratorComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [QrGeneratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [QrGeneratorService]
})
export class QrGeneratorModule { }
