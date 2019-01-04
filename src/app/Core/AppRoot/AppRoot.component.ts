import { Component } from '@angular/core';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../Store/AppState.model';
import { AuthActions } from '../../Store';

@Component({
  selector: 'app-root',
  templateUrl: './AppRoot.component.html',
  styleUrls: ['./AppRoot.component.scss']
})
// This is the top level component //
export class AppRoot {
	constructor(		
		private localStorage: LocalStorage,
		private store$: Store<AppState>,
	) {
		if(this.localStorage.isAuthenticated()) {  
			this.store$.dispatch(
				new AuthActions.LoginSuccess({
					user: this.localStorage.getAuthenticatedUser(),
					success: {
						number: 200, 
						description: 'Success!', 
						failure: false
					}
				})
			);
		}
	}
}

