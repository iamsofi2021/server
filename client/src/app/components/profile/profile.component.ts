import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { AuthState } from 'src/app/interfaces/auth-state';
import { exit, updateUser } from 'src/app/reducers/auth/auth.actions';
import { selectAuthFeature } from 'src/app/reducers/auth/auth.selectors';
import { showSnackbar } from 'src/app/reducers/snackbar/snackbar.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form = new FormGroup({});

  constructor(
    private store$: Store<AuthState>,
  ) { }

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
    this.store$.pipe(select(selectAuthFeature))
    .subscribe(state => {
      this.form = new FormGroup({
        _id: new FormControl(state._id, [Validators.minLength(3), Validators.required]),
        login: new FormControl(state.login, [Validators.minLength(3), Validators.required]),
        password: new FormControl(state.password, [Validators.minLength(3), Validators.required]),
        confirmPassword: new FormControl('', [Validators.minLength(3), Validators.required]),
        mail: new FormControl(state.mail, [Validators.minLength(3), Validators.email, Validators.required])
      });
    });
  }

  submit(): void {
    if (!this.form.valid) {
      this.confirmPassword.markAsDirty();
      return;
    }

    if (this.password?.value !== this.confirmPassword?.value) {
      this.store$.dispatch(showSnackbar({msg: `Паролі не співпадають`, isError: true}));
    } else {
      this.store$.dispatch(updateUser(this.form.value));
    }
  }

  exit(): void {
    this.store$.dispatch(exit());
  }

}
