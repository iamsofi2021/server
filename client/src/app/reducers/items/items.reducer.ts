import { createReducer, on } from '@ngrx/store';

import { ItemsListState } from 'src/app/interfaces/items-list-state';
import * as itemsActionsType from './items.actions';

export const itemsNode = 'items';

const initialState: ItemsListState = {
    items: [],
};

export const itemReducer = createReducer(
    initialState,
    on(itemsActionsType.getItemsSuccess, (state, { items }) => ({
        ...state,
        items
    })),
);
