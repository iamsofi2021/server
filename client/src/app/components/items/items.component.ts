import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  item: any;
  item2: any;
  images: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  test() {
    this.http.post<any>('/users', {}).subscribe(users => console.log(users));
  }

  handleFileInput(e: Event) {
    const fileInput: HTMLInputElement = e.target as HTMLInputElement;
    this.item = Array.from(fileInput.files as FileList)[0];
  }

  uploadFileToActivity() {
    const formData: FormData = new FormData();
    formData.append('image', this.item, this.item.name);

    this.http.post<any>('/upload', formData).subscribe((response) => {
      console.log('response received is ', response);
  });
  }

  fetch() {
    this.http.post<any>('/get-list', {}).subscribe(images => this.images = images);
  }

  show() {
    this.http.post<any>('/get-image', {key: this.images[0].Key}).subscribe(image => this.item2 = image.data);
  }
}
