import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SnackbarState } from 'src/app/interfaces/snackbar-state';
import { snackbarNode } from './snackbar.reducer';

export const selectAuthFeature = createFeatureSelector<SnackbarState>(snackbarNode);

export const selectSnackbarMsg = createSelector(
  selectAuthFeature,
  (state: SnackbarState): string => state.msg
);

export const selectSnackbarIsError = createSelector(
    selectAuthFeature,
    (state: SnackbarState): boolean => state.isError
);
