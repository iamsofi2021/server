import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AuthState } from '../interfaces/auth-state';
import { NotificationState } from '../interfaces/notification-state';
import { authNode, authReducer } from './auth/auth.reducer';
import { notifyNode, notifyReducer } from './notification/notification.reducers';


export interface State {
  [authNode]: AuthState;
  [notifyNode]: NotificationState;
}

export const reducers: ActionReducerMap<State> = {
  [authNode]: authReducer,
  [notifyNode]: notifyReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
