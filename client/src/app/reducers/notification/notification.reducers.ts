import { createReducer, on } from '@ngrx/store';
import { NotificationState } from 'src/app/interfaces/notification-state';
import * as notifyActionsType from './notification.actions';

export const notifyNode = 'notify';

const initialState: NotificationState = {
    msg: '',
    isError: false,
};

export const notifyReducer = createReducer(
    initialState,
    on(notifyActionsType.openNotification, (state, { msg, isError }) => ({
        ...state,
        msg,
        isError: !!isError,
    })),
);
