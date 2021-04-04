import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserResponse} from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }

  fetchUser(user: any): Observable<UserResponse> {
    console.log(user);
    return this.http.post<UserResponse>(`${this.baseUrl}/user`, user);
  }
}
