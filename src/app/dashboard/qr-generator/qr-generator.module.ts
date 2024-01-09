import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { QrGeneratorComponent } from './qr-generator.component';
import { QrGeneratorService } from './qr-generator.service';

import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyOptionModule as MatOptionModule} from '@angular/material/legacy-core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [QrGeneratorComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [QrGeneratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [QrGeneratorService]
})
export class QrGeneratorModule { }
