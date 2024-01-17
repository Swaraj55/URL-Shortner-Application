import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoFactorAuthDialogComponent } from './two-factor-auth-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [TwoFactorAuthDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  exports: [TwoFactorAuthDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TwoFactorAuthDialogModule {}
