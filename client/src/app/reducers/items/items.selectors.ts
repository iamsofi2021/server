import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from 'src/app/interfaces/item-state';

import { ItemsListState } from 'src/app/interfaces/items-list-state';
import { itemsNode } from './items.reducer';

export const selectItemsFeature = createFeatureSelector<ItemsListState>(itemsNode);

export const selectItems = createSelector(
    selectItemsFeature,
    (state: ItemsListState): ItemState[] => state.items,
  );
