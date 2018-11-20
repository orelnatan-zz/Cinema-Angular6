import { Http, } from '@angular/http';
import { Injectable, }  from '@angular/core';
import { Observable } from 'rxjs/Rx'; // npm install rxjs-compat
import { environment } from '../../environments/environment';

@Injectable() 
export class Movies {

    constructor(private http: Http){

    }

    getMovies(): Observable<any>{
        return this.http.get(environment.apis.moviesApi).map((response) => {
            return response.json();
        }).catch(this.handleError);
    }

    handleError(error: any): Observable<Error>{               //On error, throw exception
        return Observable.throw(error);
    }
}