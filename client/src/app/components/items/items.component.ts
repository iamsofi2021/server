import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { ItemsListState } from 'src/app/interfaces/items-list-state';
import { selectItems } from 'src/app/reducers/items/items.selectors';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { getItems } from 'src/app/reducers/items/items.actions';
import { ItemState } from 'src/app/interfaces/item-state';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  public list$: Observable<ItemState[]> = this.store$.pipe(select(selectItems));

  constructor(
    private store$: Store<ItemsListState>,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(getItems());
  }

  source(imageName: string): string {
    return `https://sofi-images.s3.us-east-2.amazonaws.com/${imageName}`;
  }
}
