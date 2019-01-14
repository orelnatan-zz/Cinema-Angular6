import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Users } from '../../Services/Users.service';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { User } from '../../Models/User.model';
import { Route } from '../../Models/Route.model';
import { Alert } from '../../Models/Alert.model';

import * as AuthActions from './Actions';

const ENTRANCE_URL: string = 'Cinema/Login';

const HOME_ROUTE: Route = {
	path: '/Cinema/Home',
	queryParams: {},
};

const LOGIN_SUCCESS: Alert = {
  message: '',
  isShown: false,
  code: 200,
}

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
						navigateTo: HOME_ROUTE,
						failure: null
					})
				}),
        catchError((error: Alert) => {
          return observableOf(new AuthActions.LoginFailure({
              failure: error
          }))
        })))
	);

	@Effect({ dispatch: false })
	LogInSuccess: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.LoginSuccess>(
				AuthActions.ActionTypes.LOGIN_SUCCESS
		),
		tap((result: AuthActions.LoginSuccess) => {
			this.localStorage.setUser(result.payload.user);
			this.router.navigate([result.payload.navigateTo.path], {
				queryParams: result.payload.navigateTo.queryParams,
			});
		})
	);

	@Effect({ dispatch: false })
	Logout: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.Logout>(
				AuthActions.ActionTypes.LOGOUT
		),
		tap(() => {
			this.localStorage.removeUser();
			this.router.navigate([ENTRANCE_URL]);
		})
	);

}
