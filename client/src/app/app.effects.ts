import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, filter, map, switchMap } from 'rxjs/operators';

import { ItemState } from './interfaces/item-state';
import { ItemsListState } from './interfaces/items-list-state';
import { LoginState } from './interfaces/login-state';
import { RegState } from './interfaces/reg-state';
import { User } from './interfaces/user';
import { exit, login, updateUserState, openLoginPage, register, remind, updateUser } from './reducers/auth/auth.actions';
import { getItems, getItemsSuccess, upload } from './reducers/items/items.actions';
import { hideSnackbar, showSnackbar } from './reducers/snackbar/snackbar.actions';
import { ErrorService } from './services/error.service';
import { ItemsService } from './services/items.service';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';

@Injectable()
export class AppEffects {
  isClosed = true;
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private itemsService: ItemsService,
    private errorService: ErrorService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  showSnackbar$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(showSnackbar),
      delay(3990),
      map(() => hideSnackbar()),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(login),
      switchMap((action: LoginState) => this.userService.fetchUser(action)),
      switchMap(res => {
        if (res.message) {
          return [showSnackbar({ msg: res.message, isError: true })];
        } else {
          this.router.navigate(['/']);
          this.localStorageService.setItem('ad_23', JSON.stringify(res.user));
          return [
            showSnackbar({ msg: `Вітаємо ${res.user?.login} на нашому сайті!` }),
            updateUserState(res.user as User),
          ];
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

  updateUser$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap((action: User) => this.userService.update(action)),
      switchMap(res => {
        if (!res.success) {
          return [showSnackbar({ msg: res.message as string, isError: true })];
        } else {
          console.log(JSON.stringify(res.user));
          this.localStorageService.setItem('ad_23', JSON.stringify(res.user));
          this.router.navigate(['/']);
          return [
            showSnackbar({ msg: res.message as string }),
            updateUserState(res.user as User),
          ];
        }
      }),
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

  upload$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(upload),
      switchMap(({ formData }) => this.itemsService.upload(formData)),
      map(res => {
        if (!res.success) {
          return showSnackbar({ msg: res.message as string, isError: true });
        } else {
          this.router.navigate(['/']);
          return showSnackbar({ msg: res.message as string });
        }
      }),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });

  getItems$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(getItems),
      switchMap(() => this.itemsService.getItems()),
      map(res => {
        if (!res.success) {
          return showSnackbar({ msg: res.message as string, isError: true });
        } else {
          return getItemsSuccess({ items: res.items as ItemState[] } as ItemsListState);
        }
      }),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });
}
