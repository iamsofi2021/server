import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, filter, map, switchMap } from 'rxjs/operators';
import { LoginState } from './interfaces/login-state';
import { RegState } from './interfaces/reg-state';

import { User } from './interfaces/user';
import { exit, login, loginSuccess, openLoginPage, register, remind } from './reducers/auth/auth.actions';
import { hideSnackbar, showSnackbar } from './reducers/snackbar/snackbar.actions';
import { ErrorService } from './services/error.service';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';

@Injectable()
export class AppEffects {
  isClosed = true;
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(login),
      filter(() => this.isClosed),
      switchMap((action: LoginState) => this.userService.fetchUser(action)),
      switchMap(res => {
        if (res.message) {
          return [showSnackbar({ msg: res.message, isError: true })];
        } else {
          this.router.navigate(['/']);
          this.localStorageService.setItem('ad_23', JSON.stringify(res.user));
          return [
            showSnackbar({ msg: `Вітаємо ${res.user?.login} на нашому сайті!` }),
            loginSuccess(res.user as User)];
        }
      }),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });

  remind$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(remind),
      filter(() => this.isClosed),
      switchMap(({ mail }) => this.userService.remind(mail)),
      switchMap(res => {
        if (!res.success) {
          return [showSnackbar({ msg: res.message as string, isError: true })];
        } else {
          return [
            showSnackbar({ msg: res.message as string }),
            openLoginPage(),
          ];
        }
      }),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });

  register$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(register),
      switchMap((action: RegState) => this.userService.register(action)),
      switchMap(res => [
        showSnackbar({ msg: res.message as string, isError: !res.success }),
        openLoginPage(),
      ]),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });

  exit$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(exit),
      map(() => {
        this.router.navigate(['/']);
        this.localStorageService.clear();
        return showSnackbar({ msg: `Ви успішно розлогувались!` });
      }),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });

  showSnackbar$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(showSnackbar),
      delay(3990),
      map(() => hideSnackbar()),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });
}
