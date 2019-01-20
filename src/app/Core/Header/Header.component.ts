import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../Store/AppState.model';
import { AuthSelectors, AuthActions, MoviesSelectors, MoviesActions } from '../../Store';
import { Router } from '@angular/router';
import { User } from '../../Models/User.model';
import { Alert } from '../../Models/Alert.model';

const LOGOUT_ALERT: Alert = {
	message: 'Sure you want to logout?',
	isShown: true,
	code: null
}

@Component({
  selector: 'header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})

export class Header {
	user$: Observable<User>;
	mode$: Observable<string>;

	constructor(
		private store$: Store<AppState>,
		private router: Router
	){
		this.user$ = this.store$.select (
			AuthSelectors.getLoggedUser
		);

		this.mode$ = this.store$.select (
			MoviesSelectors.getDisplayMode
		);
	}

	showLogoutDialog() {
		this.store$.dispatch(
			new AuthActions.Dialog({
				dialog: LOGOUT_ALERT
			})
		)
	}

	switchDisplayMode(mode: string){
		this.store$.dispatch(
			new MoviesActions.Load({
				displayMode: mode
			}),
		);
	}

}

