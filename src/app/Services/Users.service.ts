import { Http, } from '@angular/http';
import { Injectable, }  from '@angular/core';
import { Observable } from 'rxjs/Rx';   // npm install rxjs-compat
import { environment } from '../../environments/environment';
import { User } from '../Models/User.model';

@Injectable()
export class Users {

    constructor(private http: Http){

    }

    public getUsers(): Observable<User[] | Error> {
        return this.http.get(environment.apis.users.usersData).map((response) => {
            return response.json().users;
        }).catch(this.handleError).delay(2000);
    }

    private handleError(error: any): Observable<Error> {               //On error, throw exception
        return Observable.throw(error);
    }
}
