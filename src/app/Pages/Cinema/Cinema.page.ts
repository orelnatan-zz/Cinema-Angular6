import { Component, ViewChild } from '@angular/core';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors } from '../../Store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../Store/AppState.model';
import { Observable } from 'rxjs';
import { Alert } from '../../Models/Alert.model';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
})

export class Cinema {
  inProgress$: Observable<boolean>;
  dialog$: Observable<Alert>;

	constructor(
      private localStorage: LocalStorage,
      private store$: Store<AppState>,
      private router: Router,
	  private activatedRoute: ActivatedRoute,
	) {
		if(this.localStorage.isAuthenticated()) {
			this.activatedRoute.queryParams.subscribe((params: object) => {
				this.store$.dispatch(
					new AuthActions.LoginSuccess({
						user: this.localStorage.getAuthenticatedUser(),
						navigateTo: {
							path: this.router.url.split('?')[0],
							queryParams: {
								movieId: params['movieId'],
							}
						},
						failure: { isShown: false } as Alert
					})
				);
			})
    	}

    	this.dialog$ = this.store$.select (
			AuthSelectors.getAuthDialog,
		);
	}

	handleLogout(): void {
		this.store$.dispatch(
			new AuthActions.Logout(),
    	);
  	}

	hideDialog(): void {
		this.store$.dispatch(
			new AuthActions.AuthDialog({
				dialog: { isShown: false } as Alert
			})
		);
	}


}
