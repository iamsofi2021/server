import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { ItemState } from 'src/app/interfaces/item-state';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: ItemState = {} as ItemState;
  source = 'https://sofi-images.s3.us-east-2.amazonaws.com/';

  constructor() { }

  ngOnInit(): void {
    this.source += this.item.image;
  }

}
