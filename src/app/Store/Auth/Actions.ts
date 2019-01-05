import { Action } from '@ngrx/store';
import { LoginAuth } from '../../Models/LoginAuth.model';
import { User } from '../../Models/User.model';
import { Status } from '../../Models/Status.model';
import { Route } from '../../Models/Route.model';

export enum ActionTypes {
    LOGIN = '[AUTH] Login',
    LOGOUT = '[AUTH] Logout',
    LOGIN_FAILED = '[AUTH] Fail',
    LOGIN_SUCCESS = '[AUTH] Success',
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

export class LoginFailed implements Action {
	readonly type = ActionTypes.LOGIN_FAILED;

	constructor(public payload: { 
		error: Status 
	}){}
}

export class LoginSuccess implements Action {
	readonly type = ActionTypes.LOGIN_SUCCESS;

	constructor(public payload: { 
		user: User,
		success: Status,
		navigateTo: Route
	}){}
}


export type Actions = Login | Logout | LoginFailed | LoginSuccess;
