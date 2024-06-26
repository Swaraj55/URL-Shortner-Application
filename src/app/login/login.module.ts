import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

import { MaterialModule } from '../material.module';

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

    TwoFactorAuthenticationDialogModule,
    TwoFactorAuthDialogModule,
    CustomInputModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoginComponent],
})
export class LoginModule {}
