import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AuthState } from '../interfaces/auth-state';
import { ItemsListState } from '../interfaces/items-list-state';
import { SnackbarState } from '../interfaces/snackbar-state';
import { authNode, authReducer } from './auth/auth.reducer';
import { itemsNode, itemReducer } from './items/items.reducer';
import { snackbarNode, snackbarReducer } from './snackbar/snackbar.reducer';


export interface State {
  [authNode]: AuthState;
  [snackbarNode]: SnackbarState;
  [itemsNode]: ItemsListState;
}

export const reducers: ActionReducerMap<State> = {
  [authNode]: authReducer,
  [snackbarNode]: snackbarReducer,
  [itemsNode]: itemReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
