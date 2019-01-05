import { Component } from '@angular/core';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../Store/AppState.model';
import { AuthActions } from '../../Store';
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
  selector: 'app-root',
  templateUrl: './AppRoot.component.html',
  styleUrls: ['./AppRoot.component.scss']
})
// This is the top level component //
export class AppRoot {
	DISCONNECT_ALERT: string = 'Are you sure you want to logout?';

	constructor(		
		private localStorage: LocalStorage,
		private store$: Store<AppState>,
	) {
		if(this.localStorage.isAuthenticated()) {  
			this.store$.dispatch(
				new AuthActions.LoginSuccess({
					user: this.localStorage.getAuthenticatedUser(),
					navigateTo: HOME_ROUTE,
					success: SUCCESS
				})
			);
		}
	}

	handleLogout(): void {
		this.store$.dispatch(
			new AuthActions.Logout(),
		);
	}
}

