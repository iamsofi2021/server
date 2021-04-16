import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { AuthState } from 'src/app/interfaces/auth-state';
import { Tab } from 'src/app/interfaces/tab';
import { login, register, remind } from 'src/app/reducers/auth/auth.actions';
import { selectCurrentPage } from 'src/app/reducers/auth/auth.selectors';
import { showSnackbar } from 'src/app/reducers/snackbar/snackbar.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  loginTabs = {
    login: {
      id: 1,
      name: 'Введіть дані для авторизації',
      button: 'Авторизуватись'
    },
    register: {
      id: 2,
      name: 'Реєстрація нового користувача',
      button: 'Зареєструватись'
    },
    remind: {
      id: 3,
      name: 'Забули пароль',
      button: 'Нагадати пароль'
    }
  };

  currentTab = {
    tab: this.loginTabs.login
  };

  constructor(
    private store$: Store<AuthState>,
  ){}

  get login(): FormControl {
    return this.form.get('login') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  get mail(): FormControl {
    return this.form.get('mail') as FormControl;
  }

  ngOnInit(): void {
    this.open(this.loginTabs.login);
    this.store$.pipe(select(selectCurrentPage))
      .subscribe((page) => this.open(this.loginTabs[page]));
  }

  isActive(tab: Tab): boolean {
    if (!tab) {
      return false;
    }
    return this.currentTab.tab === tab;
  }

  open(tab: Tab): void {
    if (!tab) {
      return;
    }
    this.currentTab.tab = tab;
    this.form.reset();
    this.form = new FormGroup({
      login: new FormControl('', [Validators.minLength(3), Validators.required]),
      password: new FormControl('', [Validators.minLength(3), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(3), Validators.required]),
      mail: new FormControl('', [Validators.minLength(3), Validators.email, Validators.required])
    });

    if (this.isActive(this.loginTabs.login)) {
      this.form.removeControl('confirmPassword');
      this.form.removeControl('mail');
    }

    if (this.isActive(this.loginTabs.remind)) {
      this.form.removeControl('login');
      this.form.removeControl('password');
      this.form.removeControl('confirmPassword');
    }
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }

    switch (this.currentTab.tab) {
      case this.loginTabs.login:
        return this.signIn();
      case this.loginTabs.register:
        return this.register();
      case this.loginTabs.remind:
        return this.remind();
    }
  }

  signIn(): void {
    this.store$.dispatch(login(this.form.value));
  }

  register(): void {
    if (this.password?.value !== this.confirmPassword?.value) {
      this.store$.dispatch(showSnackbar({msg: `Паролі не співпадають`, isError: true}));
    } else {
      this.store$.dispatch(register(this.form.value));
    }
  }

  remind(): void {
    this.store$.dispatch(remind(this.form.value));
  }
}
