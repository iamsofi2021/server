import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SnackbarState } from './interfaces/snackbar-state';
import { selectSnackbarIsError, selectSnackbarMsg } from './reducers/snackbar/snackbar.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public msg$: Observable<string> = this.store$.pipe(select(selectSnackbarMsg));
  public isError$: Observable<boolean> = this.store$.pipe(select(selectSnackbarIsError));

  constructor(
    private store$: Store<SnackbarState>,
  ) { }
}
