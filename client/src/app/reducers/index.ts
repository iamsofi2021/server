import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AuthState } from '../interfaces/auth-state';
import { SnackbarState } from '../interfaces/snackbar-state';
import { authNode, authReducer } from './auth/auth.reducer';
import { snackbarNode, snackbarReducer } from './snackbar/snackbar.reducer';


export interface State {
  [authNode]: AuthState;
  [snackbarNode]: SnackbarState;
}

export const reducers: ActionReducerMap<State> = {
  [authNode]: authReducer,
  [snackbarNode]: snackbarReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
