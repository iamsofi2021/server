import { Injectable } from '@angular/core';
import {AuthState} from '../interfaces/auth-state';
import {select, Store} from '@ngrx/store';
import {selectIsAdmin} from '../reducers/auth/auth.selectors';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public store$: Store<AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store$.pipe(select(selectIsAdmin));
  }
}
