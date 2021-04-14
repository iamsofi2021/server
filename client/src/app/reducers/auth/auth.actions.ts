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
  props<{ login: string; password: string; mail?: string; isAdmin?: boolean; }>()
);

export const register = createAction(
  '[AUTH] register',
  props<{ login: string; password: string; confirmPassword: string; mail: string; }>()
);

export const remind = createAction(
  '[AUTH] remind',
  props<{ mail: string; }>()
);

export const exit = createAction(
  '[AUTH] exit',
);

export const openLoginPage = createAction(
  '[AUTH] open login page',
);

export const openRegisterPage = createAction(
  '[AUTH] open register page',
);

export const openRemindPage = createAction(
  '[AUTH] open remind page',
);
