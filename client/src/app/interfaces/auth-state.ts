import { authPages } from '../reducers/auth/auth.actions';

export interface AuthState {
  login: string;
  password: string;
  isAdmin: boolean;
  currentPage: authPages;
}
