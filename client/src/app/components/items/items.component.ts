import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  test() {
    this.http.post<any>('/users', {}).subscribe(users => console.log(users));
  }

}
