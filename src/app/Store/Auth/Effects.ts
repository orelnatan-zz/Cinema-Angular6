import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Users } from '../../Services/Users.service';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { Status } from '../../Models/Status.model';
import { User } from '../../Models/User.model';

import * as AuthActions from './Actions';

const HOME_PATH: string = '/Cinema/Home';

@Injectable()
export class AuthEffects {

	constructor(
		private router: Router,
		private users: Users,
		private localStorage: LocalStorage,
        private actions$: Actions
    ) {}

	@Effect()
    userLoggedIn$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.Login>(
            AuthActions.ActionTypes.LOGIN
        ),
        switchMap((action) => this.users.getRegisteredUser(action.payload.loginAuth).pipe(
				map((user: User) => {
					return new AuthActions.LoginSuccess({
						user: user,
						success: { 
							number: 200, 
							description: 'Success!', 
							failure: false
						}
					})
				}),
				catchError((error: Status) => {
					return observableOf(new AuthActions.LoginFailed({ 
						error: error
					}))
				})
            )
        )
	);

	@Effect({ dispatch: false })
	LogInSuccess: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.LoginSuccess>(
				AuthActions.ActionTypes.LOGIN_SUCCESS
		),
		tap((result: AuthActions.LoginSuccess) => {
			this.localStorage.setUser(result.payload.user);
			this.router.navigate([ HOME_PATH ]);
		})
	);

}
