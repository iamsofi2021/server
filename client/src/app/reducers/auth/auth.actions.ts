import { createAction, props } from '@ngrx/store';

export enum authPages {
  login = 'login',
  remind = 'remind',
  register = 'register',
}

export const login = createAction(
  '[AUTH] log in',
  props<{ login: string; password: string }>()
);

export const loginSuccess = createAction(
  '[AUTH] log in success',
  props<{ login: string; password: string; isAdmin?: boolean; }>()
);

export const openLoginPage = createAction(
  '[AUTH] open login page',
);

export const openRegisterPage = createAction(
  '[AUTH] open login page',
);

export const openRemindPage = createAction(
  '[AUTH] open login page',
);
