import { createAction, props } from '@ngrx/store';

export const openNotification = createAction(
    '[NOTIFY] open notification',
    props<{ msg: string; isError?: boolean }>()
);

export const openNotificationSuccessful = createAction(
    '[NOTIFY] open notification successful',
);
