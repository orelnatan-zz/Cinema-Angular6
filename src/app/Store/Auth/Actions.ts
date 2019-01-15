import { Action } from '@ngrx/store';
import { LoginAuth } from '../../Models/LoginAuth.model';
import { User } from '../../Models/User.model';
import { Route } from '../../Models/Route.model';
import { Alert } from '../../Models/Alert.model';

export enum ActionTypes {
    LOGIN = '[AUTH] Login',
    LOGOUT = '[AUTH] Logout',
    AUTHENTICATED = '[AUTH] Authenticated',
    AUTH_DIALOG = '[AUTH] Dialog',
    AUTH_FAILURE = '[AUTH] Failure',
}

export class Login implements Action {
    readonly type = ActionTypes.LOGIN;

    constructor(public payload: {
		loginAuth: LoginAuth
	}){}
}

export class Logout implements Action {
	readonly type = ActionTypes.LOGOUT;

	constructor(){}
}

export class Authenticated implements Action {
	readonly type = ActionTypes.AUTHENTICATED;

	constructor(public payload: {
		user: User,
		navigateTo: Route
	}){}
}

export class AuthDialog implements Action {
	readonly type = ActionTypes.AUTH_DIALOG;

	constructor(public payload: {
    	dialog: Alert
  	}){}
}

export class AuthFailure implements Action {
	readonly type = ActionTypes.AUTH_FAILURE;

	constructor(public payload: {
		failure: Alert
	}){}
}

export type Actions = AuthDialog | Login | Logout | AuthFailure | Authenticated;
