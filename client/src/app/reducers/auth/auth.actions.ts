import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[AUTH] log in',
  props<{ login: string; password: string }>()
);

export const loginSuccess = createAction(
  '[AUTH] log in success',
  props<{ login: string; password: string; isAdmin?: boolean; }>()
);

export const loginError = createAction(
  '[AUTH] log in error',
);
