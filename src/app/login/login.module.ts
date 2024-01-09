import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { TwoFactorAuthenticationDialogModule } from './two-factor-authentication-dialog/two-factor-authentication-dialog.module';
import { TwoFactorAuthDialogModule } from './two-factor-auth-dialog/two-factor-auth-dialog.module';
@NgModule({
  declarations: [
    LoginComponent
  ],
  entryComponents: [
    TwoFactorAuthenticationDialogModule,
    TwoFactorAuthDialogModule
  ],
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
    TwoFactorAuthDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoginComponent]
})
export class LoginModule { }
