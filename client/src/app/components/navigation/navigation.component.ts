import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthState } from 'src/app/interfaces/auth-state';
import { User } from 'src/app/interfaces/user';
import { updateUserState } from 'src/app/reducers/auth/auth.actions';
import { selectIsAdmin, selectLogin } from 'src/app/reducers/auth/auth.selectors';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public isAdmin$: Observable<boolean> = this.store$.pipe(select(selectIsAdmin));
  public login$: Observable<string> = this.store$.pipe(select(selectLogin));

  constructor(
    private store$: Store<AuthState>,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    const user = this.localStorageService.getItem('ad_23');
    if (user) {
      this.store$.dispatch(updateUserState(JSON.parse(user) as User));
    }
  }
}
