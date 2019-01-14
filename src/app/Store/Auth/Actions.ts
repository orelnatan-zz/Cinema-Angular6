import { Action } from '@ngrx/store';
import { LoginAuth } from '../../Models/LoginAuth.model';
import { User } from '../../Models/User.model';
import { Route } from '../../Models/Route.model';
import { Alert } from '../../Models/Alert.model';

export enum ActionTypes {
    LOGIN = '[AUTH] Login',
    LOGOUT = '[AUTH] Logout',
    LOGIN_FAILURE = '[AUTH] Failure',
    LOGIN_SUCCESS = '[AUTH] Success',
    AUTH_DIALOG = '[AUTH] Dialog',
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

export class LoginFailure implements Action {
	readonly type = ActionTypes.LOGIN_FAILURE;

	constructor(public payload: {
		failure: Alert
	}){}
}

export class LoginSuccess implements Action {
	readonly type = ActionTypes.LOGIN_SUCCESS;

	constructor(public payload: {
		user: User,
		failure: Alert,
		navigateTo: Route
	}){}
}

export class AuthDialog implements Action {
	readonly type = ActionTypes.AUTH_DIALOG;

	constructor(public payload: {
    	dialog: Alert
  	}){}
}


export type Actions = AuthDialog | Login | Logout | LoginFailure | LoginSuccess;
