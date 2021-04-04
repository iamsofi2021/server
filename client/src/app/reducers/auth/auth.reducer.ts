import * as authActionsType from './auth.actions';
import { AuthState } from '../../interfaces/auth-state';
import { createReducer, on } from '@ngrx/store';

export const authNode = 'auth';

const initialState: AuthState = {
  login: '',
  password: '',
  isAdmin: false,
};

export const authReducer = createReducer(
  initialState,
  on(authActionsType.loginSuccess, (state, { login, password, isAdmin }) => ({
    login,
    password,
    isAdmin: !!isAdmin,
  })),
);
