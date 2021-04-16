import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from '../interfaces/item';
import { ItemResponse } from '../interfaces/item-response';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  // baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  upload(item: FormData): Observable<ItemResponse> {
    // return this.http.post<ItemResponse>(`${this.baseUrl}/upload`, item);
    return this.http.post<ItemResponse>(`/upload`, item);
  }

  getItems(): Observable<ItemResponse> {
    // return this.http.post<ItemResponse>(`${this.baseUrl}/get-list`, {});
    return this.http.post<ItemResponse>(`/get-list`, {});
  }
}
