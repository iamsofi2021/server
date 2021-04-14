import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { UserResponse } from '../interfaces/user-response';
import { RegState } from '../interfaces/reg-state';
import { LoginState } from '../interfaces/login-state';

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

  register({ login, password, confirmPassword, mail }: RegState): Observable<UserResponse> {
    // return this.http.post<UserResponse>(`${this.baseUrl}/register`, { login, password, confirmPassword, mail });
    return this.http.post<UserResponse>(`/register`, { login, password, confirmPassword, mail });
  }

  remind(mail: string): Observable<UserResponse> {
    // return this.http.post<UserResponse>(`${this.baseUrl}/remind`, { mail });
    return this.http.post<UserResponse>(`/remind`, { mail });
  }
}
