import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authNode} from './auth.reducer';
import {AuthState} from '../../interfaces/auth-state';

export const selectAuthFeature = createFeatureSelector<AuthState>(authNode);

export const selectLogin = createSelector(
  selectAuthFeature,
  (state: AuthState): string => state.login
);

export const selectPassword = createSelector(
  selectAuthFeature,
  (state: AuthState): string => state.password
);

export const selectIsAdmin = createSelector(
  selectAuthFeature,
  (state: AuthState): boolean => state.isAdmin
);
