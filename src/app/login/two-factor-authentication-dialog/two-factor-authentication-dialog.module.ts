import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoFactorAuthenticationDialogComponent } from './two-factor-authentication-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomOtpInputModule } from 'src/@url-shortner/components/custom-otp-input/custom-otp-input.module';


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
    MatIconModule,
    ClipboardModule,
    MatTooltipModule,
    CustomOtpInputModule
  ],
  exports: [TwoFactorAuthenticationDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TwoFactorAuthenticationDialogModule {}
