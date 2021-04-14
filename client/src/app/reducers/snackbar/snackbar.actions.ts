import { createAction, props } from '@ngrx/store';

export const showSnackbar = createAction(
    '[SNACKBAR] show',
    props<{ msg: string; isError?: boolean }>()
);

export const hideSnackbar = createAction(
    '[SNACKBAR] hide',
);
