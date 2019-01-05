import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthSelectors, AuthActions } from '../../Store';
import { LoginAuth } from '../../Models/LoginAuth.model';
import { AppState } from '../../Store/AppState.model';
import { User } from '../../Models/User.model';
import { Status } from '../../Models/Status.model';
import { Loader } from '../../Modals/Loader';
import { Failure } from '../../Modals/Failure';

@Component({
  selector: 'entrance',
  templateUrl: './Entrance.page.html',
  styleUrls: ['./Entrance.page.scss'],
})

export class Entrance implements OnInit {
	@ViewChild('loaderRef') loaderRef: Loader;
	@ViewChild('failureRef') failureRef: Failure;

	user$: Observable<User>;
	isPending$: Observable<boolean>;
	status$: Observable<Status>;

	constructor(
		private store$: Store<AppState>,
	) {
		this.user$ = this.store$.select (
			AuthSelectors.getLoggedUser
		);
		
		this.isPending$ = this.store$.select (
			AuthSelectors.getAuthIsPending
		);

		this.status$ = this.store$.select (
			AuthSelectors.getLoginStatus
		);
	}

	ngOnInit(){
		this.status$.subscribe((status: Status) => {
			status.failure ? this.handleFailure(status) : null;
		})

		this.isPending$.subscribe((isPending: boolean) => {
			isPending ? this.loaderRef.showLoader() : this.loaderRef.hideLoader();
		})
	}

	handleSubmit(login: LoginAuth): void {
		this.store$.dispatch(
			new AuthActions.Login({
				loginAuth: login,
			})
		);
	}

	handleFailure(status: Status): void {
		this.failureRef.showFailure(status.description);
	}

	

}

