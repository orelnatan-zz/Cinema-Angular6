import { Component, } from '@angular/core';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../Store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../Store/AppState.model';
import { Status } from '../../Models/Status.model';
import { Route } from '../../Models/Route.model';

const SUCCESS: Status = {
	number: 200,
	description: 'Server responded with status code 200!, Success!.',
	failure: false
};

const HOME_ROUTE: Route = {
	path: '/Cinema/Home',
	queryParams: {},
};

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
})

export class Cinema {
	DISCONNECT_ALERT: string = 'Are you sure you want to logout?';

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
                    success: SUCCESS
                })
            );
        })

		}
	}

	handleLogout(): void {
		this.store$.dispatch(
			new AuthActions.Logout(),
		);
	}
}
