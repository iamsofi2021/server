import { ItemState } from './item-state';

export interface ItemResponse {
    message?: string;
    success?: boolean;
    items?: ItemState[];
}
