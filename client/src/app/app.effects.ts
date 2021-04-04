import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { ModalComponent } from './components/modal/modal.component';
import { User } from './interfaces/user';
import { login, loginError, loginSuccess } from './reducers/auth/auth.actions';
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

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(login),
      filter(() => this.isClosed),
      switchMap(({ login, password }) => this.userService.fetchUser({ login, password })),
      map(res => {
        if (res.message) {
          this.openModal(res.message, true);
          return loginError();
        } else {
          this.router.navigate(['/']);
          setTimeout(() => {
            this.openModal(`Вітаємо ${res.user?.login} на нашому сайті!`);
          }, 10);
          return loginSuccess(res.user as User);
        }
      }),
      catchError(err => of(this.errorService.handleError(err)))
    );
  });

  openModal(msg: string, isError?: boolean): void {
    const modalRef = this.modalService.open(ModalComponent, { backdrop: false });
    this.isClosed = false;
    modalRef.result.then(() => {
      this.isClosed = true;
    });
    modalRef.componentInstance.message = msg;
    modalRef.componentInstance.timeOut = true;
    modalRef.componentInstance.isErrorMsg = isError;
  }
}
