import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { TwoFactorAuthenticationDialogModule } from './two-factor-authentication-dialog/two-factor-authentication-dialog.module';
import { TwoFactorAuthDialogModule } from './two-factor-auth-dialog/two-factor-auth-dialog.module';
import { CustomInputModule } from 'src/@url-shortner/components/custom-input/cutom-input.component.module';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,

    TwoFactorAuthenticationDialogModule,
    TwoFactorAuthDialogModule,
    CustomInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoginComponent],
})
export class LoginModule {}
