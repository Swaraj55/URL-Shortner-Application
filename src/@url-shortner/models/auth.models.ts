export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
