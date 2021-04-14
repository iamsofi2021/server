import { authPages } from '../reducers/auth/auth.actions';

export interface AuthState {
  _id: string;
  login: string;
  password: string;
  mail: string;
  isAdmin: boolean;
  currentPage: authPages;
}
