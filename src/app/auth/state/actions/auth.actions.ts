import { createAction, props } from '@ngrx/store';
import { User } from '@url-shortner/models/auth.models'

// Login
export const login = createAction('[Auth] Login', props<{ username: string; password: string, totp: string, remember_me: boolean }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

//Signup
export const singup = createAction('[Auth] Signup', props<{ email: string; password: string, username: string, account_creation: boolean }>());
export const singupSuccess = createAction('[Auth] Signup Success', props<{ res: any }>());
export const singupFailure = createAction('[Auth] Signup Failure', props<{ error: string }>());

// Logout
export const logout = createAction('[Auth] Logout');