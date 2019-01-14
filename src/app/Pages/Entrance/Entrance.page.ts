import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthSelectors, AuthActions } from '../../Store';
import { LoginAuth } from '../../Models/LoginAuth.model';
import { AppState } from '../../Store/AppState.model';
import { Alert } from '../../Models/Alert.model';

@Component({
  selector: 'entrance',
  templateUrl: './Entrance.page.html',
  styleUrls: ['./Entrance.page.scss'],
})

export class Entrance {
	inProgress$: Observable<boolean>;
	failure$: Observable<Alert>;

	constructor(
		private store$: Store<AppState>,
	) {
		this.inProgress$ = this.store$.select (
				AuthSelectors.getAuthInProgress,
    	);

		this.failure$ = this.store$.select (
				AuthSelectors.getAuthFailure,
		);
	}

	handleSubmit(login: LoginAuth): void {
		this.store$.dispatch(
			new AuthActions.Login({
				loginAuth: login,
			})
		);
	}

	hideFailure(): void {
		this.store$.dispatch(
			new AuthActions.LoginFailure({
				failure: { isShown: false } as Alert
			})
		);
	}


}

