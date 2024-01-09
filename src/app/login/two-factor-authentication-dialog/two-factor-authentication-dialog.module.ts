import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoFactorAuthenticationDialogComponent } from './two-factor-authentication-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Angular Material
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';

@NgModule({
  declarations: [TwoFactorAuthenticationDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    TwoFactorAuthenticationDialogComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TwoFactorAuthenticationDialogModule { }
