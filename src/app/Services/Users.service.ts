import { Http, } from '@angular/http';
import { Injectable, }  from '@angular/core';
import { Observable, } from 'rxjs/Rx';   // npm install rxjs-compat
import { User } from '../Models/User.model';
import { Status } from '../Models/Status.model';
import { LoginAuth } from '../Models/LoginAuth.model';

const USERS: Array<User> = [
	{
	  "id": 305538332,
	  "username": "orel",
	  "password": "w754e",
	  "mail": "natenorel@gmail.com",
	  "favorites": []
	},
	{
	  "id": 554543666,
	  "username": "ran perets",
	  "password": "11111",
	  "mail": "ranperets@gmail.com",
	  "favorites": []
	},
	{
	  "id": 776543243,
	  "username": "naor avitan",
	  "password": "qazxs1",
	  "mail": "naor@gmail.com",
	  "favorites": []
	},
	{
	  "id": 986532222,
	  "username": "ron avni",
	  "password": "edcvfr",
	  "mail": "ronav@gmail.com",
	  "favorites": []
	},
	{
	  "id": 324436667,
	  "username": "maor eli",
	  "password": "trr432",
	  "mail": "maorEli@gmail.com",
	  "favorites": []
	}
];

const USER_NOT_EXIST: Status = {
	number: 404,
	description: 'Server Error 404: User not exist.',
	failure: true,
}

const WRONG_PASSWORD: Status = {
	number: 401,
	description: 'Server Error 401: Unauthorized password.',
	failure: true,
}

/* This service simulates a real Ajax requst(with a duration of 3s), that returns specific user or a relevant error if necessary */
@Injectable()
export class Users {
	user$: Observable<User>;

	constructor(private http: Http){}

	public getRegisteredUser(login: LoginAuth): Observable<User | Error> {
		const user = USERS.find((user: User) => { 
								return user.username == login.username 
							});

		return user ? (user.password == login.password) 
					? Observable.of(user).delay(3000) : this._handleError(WRONG_PASSWORD)
		 			  								  : this._handleError(USER_NOT_EXIST);			

    }

	_handleError(error: any): Observable<Error>{               //On error, throw exception
        return Observable
		.throw(error)
		.materialize()
		.delay(3000)
		.dematerialize();
    }
}
