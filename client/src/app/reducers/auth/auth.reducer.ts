import { createReducer, on } from '@ngrx/store';

import * as authActionsType from './auth.actions';
import { AuthState } from '../../interfaces/auth-state';

export const authNode = 'auth';

const initialState: AuthState = {
  login: '',
  password: '',
  isAdmin: false,
  currentPage: authActionsType.authPages.login,
};

export const authReducer = createReducer(
  initialState,
  on(authActionsType.loginSuccess, (state, { login, password, isAdmin }) => ({
    ...state,
    login,
    password,
    isAdmin: !!isAdmin,
  })),
  on(authActionsType.openLoginPage, state => ({
    ...state,
    currentPage: authActionsType.authPages.login
  })),
  on(authActionsType.openRegisterPage, state => ({
    ...state,
    currentPage: authActionsType.authPages.register
  })),
  on(authActionsType.openRemindPage, state => ({
    ...state,
    currentPage: authActionsType.authPages.remind
  })),
);
