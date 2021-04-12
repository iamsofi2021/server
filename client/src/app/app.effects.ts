import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, filter, map, switchMap } from 'rxjs/operators';

import { ModalComponent } from './components/modal/modal.component';
import { User } from './interfaces/user';
import { login, loginSuccess } from './reducers/auth/auth.actions';
import { openNotification, openNotificationSuccessful } from './reducers/notification/notification.actions';
import { ErrorService } from './services/error.service';
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
          openNotification({msg: res.message, isError: true});
          return [openNotification({msg: res.message, isError: true})];
        } else {
          this.router.navigate(['/']);
          return [
            openNotification({msg: `Вітаємо ${res.user?.login} на нашому сайті!`}),
            loginSuccess(res.user as User)];
        }
      }),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });
}
