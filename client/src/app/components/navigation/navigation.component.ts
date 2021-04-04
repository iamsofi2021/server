import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/interfaces/auth-state';
import { selectLogin } from 'src/app/reducers/auth/auth.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public login$: Observable<string> = this.store$.pipe(select(selectLogin));

  constructor(
    private store$: Store<AuthState>,
  ) { }

  ngOnInit(): void {
  }
}
