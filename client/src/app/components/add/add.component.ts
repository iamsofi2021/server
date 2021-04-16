import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ItemState } from 'src/app/interfaces/item-state';
import { upload } from 'src/app/reducers/items/items.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form = new FormGroup({
    itemName: new FormControl('', [Validators.minLength(3), Validators.required]),
    itemPrice: new FormControl('', [Validators.minLength(3), Validators.required]),
    itemImage: new FormControl('', [Validators.required]),
  });

  item: File | null = null;

  constructor(
    private store$: Store<ItemState>,
  ) { }

  get itemName(): FormControl {
    return this.form.get('itemName') as FormControl;
  }

  get itemPrice(): FormControl {
    return this.form.get('itemPrice') as FormControl;
  }

  get itemImage(): FormControl {
    return this.form.get('itemImage') as FormControl;
  }

  ngOnInit(): void {
  }

  handleFileInput(e: Event): void {
    const fileInput: HTMLInputElement = e.target as HTMLInputElement;
    this.item = Array.from(fileInput.files as FileList)[0];
  }

  submit(): void {
    if (!this.form.valid || !this.item) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append('image', this.item, this.item.name);
    formData.append('name', this.itemName.value);
    formData.append('price', this.itemPrice.value);
    formData.append('createdDate', new Date().toLocaleDateString());

    this.store$.dispatch(upload({ formData }));
  }
}
