import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { QrGeneratorComponent } from './qr-generator.component';
import { QrGeneratorService } from './qr-generator.service';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';


@NgModule({
  declarations: [QrGeneratorComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [QrGeneratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [QrGeneratorService]
})
export class QrGeneratorModule { }
