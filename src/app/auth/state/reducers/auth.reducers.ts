import { createReducer, on } from "@ngrx/store";
import { initialState } from '../auth.state';
import * as AuthActions from '../actions/auth.actions';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.singup, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.singupSuccess, (state, { res }) => ({
    ...state,
    res,
    loading: false,
    error: null,
  })),
  on(AuthActions.singupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.logout, () => initialState)
);
