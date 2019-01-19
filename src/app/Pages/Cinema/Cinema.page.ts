import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors, MoviesActions, MoviesSelectors } from '../../Store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../Store/AppState.model';
import { Observable } from 'rxjs';
import { Alert } from '../../Models/Alert.model';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
})

export class Cinema implements OnInit {
    inProgress$: Observable<boolean>;
	dialog$: Observable<Alert>;
	failure$: Observable<Alert>;

	constructor(
      private localStorage: LocalStorage,
      private store$: Store<AppState>,
      private router: Router,
	  private activatedRoute: ActivatedRoute,
	) {
		if(this.localStorage.isAuthenticated()) {
			this.activatedRoute.queryParams.subscribe((params: object) => {
				this.store$.dispatch(
					new AuthActions.Authenticated({
						user: this.localStorage.getAuthenticatedUser(),
						navigateTo: {
							path: this.router.url.split('?')[0],
							queryParams: {
								movieId: params['movieId'],
							}
						},
					})
				);
			})
    	}

    	this.dialog$ = this.store$.select (
			AuthSelectors.getDialog,
		);

		this.failure$ = this.store$.select (
			MoviesSelectors.getFailure,
		);
	}

    ngOnInit() {
        this.store$.dispatch(
			new MoviesActions.Load({
				displayMode: 'Default'
			}),
		);
    }

	handleLogout(): void {
		this.store$.dispatch(
			new AuthActions.Logout(),
    	);
  	}

	hideDialog(): void {
		this.store$.dispatch(
			new AuthActions.Dialog({
				dialog: { isShown: false } as Alert
			})
		);
	}

	hideFailure(): void {
		this.store$.dispatch(
			new MoviesActions.Failure({
				failure: { isShown: false } as Alert,
			})
		);
    }

}
