import { createReducer, on } from '@ngrx/store';

import * as authActionsType from './auth.actions';
import { AuthState } from '../../interfaces/auth-state';

export const authNode = 'auth';

const initialState: AuthState = {
  login: '',
  password: '',
  mail: '',
  isAdmin: false,
  currentPage: null as any,
};

export const authReducer = createReducer(
  initialState,
  on(authActionsType.loginSuccess, (state, { login, password, mail, isAdmin }) => ({
    ...state,
    login,
    password,
    mail: mail || '',
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
  on(authActionsType.exit, state => ({
    ...state,
    login: '',
    password: '',
    mail: '',
    isAdmin: false,
  })),
);
