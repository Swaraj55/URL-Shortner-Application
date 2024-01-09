import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityComponent } from './security.component';

//Angular Material
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [SecurityComponent],
  exports: [SecurityComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurityModule { }
