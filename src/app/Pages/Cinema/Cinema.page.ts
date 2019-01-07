import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { Store } from '@ngrx/store';
import { AuthActions, MoviesSelectors, AuthSelectors } from '../../Store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../Store/AppState.model';
import { Status } from '../../Models/Status.model';
import { Loader } from '../../Modals/Loader';
import { Observable } from 'rxjs';

const SUCCESS: Status = {
	number: 200,
	description: 'Server responded with status code 200!, Success!.',
	failure: false
};

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
})

export class Cinema {
	DISCONNECT_ALERT: string = 'Are you sure you want to logout?';

	@ViewChild('loaderRef') loaderRef: Loader;
	isPending$: Observable<boolean>;
	
	constructor(
      private localStorage: LocalStorage,
      private store$: Store<AppState>,
      private router: Router,
	  private activatedRoute: ActivatedRoute,
	  private changeDetectorRef: ChangeDetectorRef
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

		// this.isPending$ = this.store$.select (
		// 	MoviesSelectors.getMoviesIsPending,
		// );
	}


	handleLogout(): void {
		this.store$.dispatch(
			new AuthActions.Logout(),
		);
	}
}
