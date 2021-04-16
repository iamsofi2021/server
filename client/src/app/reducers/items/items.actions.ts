import { createAction, props } from '@ngrx/store';

import { ItemState } from 'src/app/interfaces/item-state';

export const upload = createAction(
    '[AUTH] upload item',
    props<{ formData: FormData; }>()
);

export const getItems = createAction(
    '[AUTH] get items',
);

export const getItemsSuccess = createAction(
    '[AUTH] get items success',
    props<{ items: ItemState[] }>()
);
