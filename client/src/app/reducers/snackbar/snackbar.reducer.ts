import { createReducer, on } from '@ngrx/store';

import * as snackbarActionsType from './snackbar.actions';
import { SnackbarState } from 'src/app/interfaces/snackbar-state';

export const snackbarNode = 'snackbar';

const initialState: SnackbarState = {
    msg: '',
    isError: false,
};

export const snackbarReducer = createReducer(
    initialState,
    on(snackbarActionsType.showSnackbar, (state, { msg, isError }) => ({
        ...state,
        msg,
        isError: !!isError,
    })),
    on(snackbarActionsType.hideSnackbar, state => ({
        ...state,
        msg: '',
        isError: false,
    })),
);
