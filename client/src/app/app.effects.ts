import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, filter, map, switchMap } from 'rxjs/operators';

import { ModalComponent } from './components/modal/modal.component';
import { User } from './interfaces/user';
import { login, loginSuccess, openLoginPage, register, remind } from './reducers/auth/auth.actions';
import { openNotification, openNotificationSuccessful } from './reducers/notification/notification.actions';
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
    private modalService: NgbModal,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  openNotification$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(openNotification),
      delay(100),
      map(action => {
        const modalRef = this.modalService.open(ModalComponent, { backdrop: false });
        this.isClosed = false;
        modalRef.result.then(() => {
          this.isClosed = true;
        });
        modalRef.componentInstance.message = action.msg;
        modalRef.componentInstance.timeOut = true;
        modalRef.componentInstance.isErrorMsg = action.isError;
        return openNotificationSuccessful();
      })
    );
  });

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(login),
      filter(() => this.isClosed),
      switchMap(({ login, password }) => this.userService.fetchUser({ login, password })),
      switchMap(res => {
        if (res.message) {
          return [openNotification({ msg: res.message, isError: true })];
        } else {
          this.router.navigate(['/']);
          this.localStorageService.setItem('ad_23', JSON.stringify(res.user));
          return [
            openNotification({ msg: `Вітаємо ${res.user?.login} на нашому сайті!` }),
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
          return [openNotification({ msg: res.message as string, isError: true })];
        } else {
          return [
            openNotification({ msg: res.message as string }),
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
      filter(() => this.isClosed),
      switchMap((action: User) => this.userService.register(action)),
      switchMap(res => [
        openNotification({ msg: res.message as string, isError: !res.success }),
        openLoginPage(),
      ]),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });
}
