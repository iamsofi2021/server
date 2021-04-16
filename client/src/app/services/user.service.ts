import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { UserResponse } from '../interfaces/user-response';
import { RegState } from '../interfaces/reg-state';
import { LoginState } from '../interfaces/login-state';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  fetchUser({ login, password }: LoginState): Observable<UserResponse> {
    // return this.http.post<UserResponse>(`${this.baseUrl}/user`, { login, password });
    return this.http.post<UserResponse>(`/user`, { login, password });
  }

  register({ login, password, mail }: RegState): Observable<UserResponse> {
    // return this.http.post<UserResponse>(`${this.baseUrl}/register`, { login, password, mail });
    return this.http.post<UserResponse>(`/register`, { login, password, mail });
  }

  remind(mail: string): Observable<UserResponse> {
    // return this.http.post<UserResponse>(`${this.baseUrl}/remind`, { mail });
    return this.http.post<UserResponse>(`/remind`, { mail });
  }

  update({ _id, login, password, mail }: User): Observable<UserResponse> {
    // return this.http.post<UserResponse>(`${this.baseUrl}/update-user`, { _id, login, password, mail });
    return this.http.post<UserResponse>(`/remind`, { _id, login, password, mail });
  }
}
