import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/effects/auth.effects';
import { authReducer } from './state/reducers/auth.reducers';
import { MaterialModule } from '@app/material.module';
import { TwoFactorAuthDialogComponent } from './login/two-factor-auth-dialog/two-factor-auth-dialog.component';
import { TwoFactorAuthenticationDialogComponent } from './login/two-factor-authentication-dialog/two-factor-authentication-dialog.component';
import { TermsAndConditionComponent } from './signup/terms-and-condition/terms-and-condition.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    TwoFactorAuthDialogComponent,
    TwoFactorAuthenticationDialogComponent,
    TermsAndConditionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),

    MaterialModule
  ]
})
export class AuthModule { }
