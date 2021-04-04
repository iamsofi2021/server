import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/interfaces/auth-state';
import { login } from 'src/app/reducers/auth/auth.actions';
import { RipplesService } from 'src/app/services/ripples.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.minLength(3), Validators.required]),
    password: new FormControl('', [Validators.minLength(3), Validators.required]),
  });

  constructor(
    private store$: Store<AuthState>,
    private rippleService: RipplesService,
  ){}

  ngOnInit(): void {
    this.rippleService.animate();
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }

    this.login();
  }

  login(): void {
    this.store$.dispatch(login(this.form.value));
  }
}
