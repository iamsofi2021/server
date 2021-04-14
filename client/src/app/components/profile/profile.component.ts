import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from 'src/app/interfaces/auth-state';
import { exit } from 'src/app/reducers/auth/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private store$: Store<AuthState>,
  ) { }

  ngOnInit() {
  }

  exit(): void {
    this.store$.dispatch(exit());
  }

}
