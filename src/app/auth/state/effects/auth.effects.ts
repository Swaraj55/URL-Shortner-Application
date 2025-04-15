import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthenticationService } from '@url-shortner/services/authentication.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthenticationService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password, provider, mfaCode, rememberMe }) =>
        this.authService.login(email, password, provider, mfaCode, rememberMe).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  singup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.singup),
      mergeMap(({ email, password, username, account_creation }) =>
        this.authService.signUpUser({ email, password, username, account_creation }).pipe(
          map((res: any) => AuthActions.singupSuccess({ res })),
          catchError((error) => of(AuthActions.singupFailure({ error: error.message })))
        )
      )
    )
  );
}
