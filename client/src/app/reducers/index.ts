import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthState } from '../interfaces/auth-state';
import { authNode, authReducer } from './auth/auth.reducer';


export interface State {
  [authNode]: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  [authNode]: authReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
