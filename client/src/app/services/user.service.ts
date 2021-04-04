import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserResponse } from '../interfaces/user-response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }

  fetchUser(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/user`, user);
  }
}
