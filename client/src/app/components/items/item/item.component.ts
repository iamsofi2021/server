import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: File = {} as File;
  url: string | ArrayBuffer | null = '';

  constructor() { }

  ngOnInit() {
    const reader = new FileReader();
    reader.readAsDataURL(this.item); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
    }
  }

}
