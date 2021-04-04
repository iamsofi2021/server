import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from './interfaces/user';
import { login, loginError, loginSuccess } from './reducers/auth/auth.actions';
import { ErrorService } from './services/error.service';
import { UserService } from './services/user.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
  ) { }

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(({ login, password }) => this.userService.fetchUser({ login, password })),
      map(res => {
        console.log(res);
        if (res.message) {
          return loginError();
        } else {
          this.router.navigate(['/']);
          return loginSuccess(res.user as User);
        }
      }),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });
}
