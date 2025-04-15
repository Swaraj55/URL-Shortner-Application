import { AuthState } from '@url-shortner/models/auth.models';

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};
