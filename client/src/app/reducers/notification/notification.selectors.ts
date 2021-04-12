import { createFeatureSelector, createSelector } from '@ngrx/store';

import { NotificationState } from 'src/app/interfaces/notification-state';
import { notifyNode } from './notification.reducers';

export const selectNotifyFeature = createFeatureSelector<NotificationState>(notifyNode);

export const selectNotificationMsg = createSelector(
    selectNotifyFeature,
    (state: NotificationState): string => state.msg
);

export const selectNotificationIsError = createSelector(
    selectNotifyFeature,
    (state: NotificationState): boolean => state.isError
);