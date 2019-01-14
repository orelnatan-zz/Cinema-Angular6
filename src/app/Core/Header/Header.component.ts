import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../Store/AppState.model';
import { AuthSelectors, AuthActions } from '../../Store';
import { Router } from '@angular/router';
import { User } from '../../Models/User.model';

@Component({
  selector: 'header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})

export class Header {
	user$: Observable<User>;

	constructor(
		private store$: Store<AppState>,
		private router: Router
	){
		this.user$ = this.store$.select (
			AuthSelectors.getLoggedUser
		);
	}

	showLogoutDialog() {
		this.store$.dispatch(
			new AuthActions.AuthDialog({
				dialog: {
					message: 'Sure you want to logout?',
					isShown: true,
				}
			})
		)
	}
}

