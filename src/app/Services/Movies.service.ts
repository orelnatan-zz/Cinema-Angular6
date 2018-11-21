import { Http, } from '@angular/http';
import { Injectable, }  from '@angular/core';
import { Observable } from 'rxjs/Rx';   // npm install rxjs-compat
import { environment } from '../../environments/environment';
import { Movie } from '../Models/Movie.modal';

// 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.descmovie&api_key=cfe422613b250f702980a3bbf9e90716'
//  'http://www.omdbapi.com/?i=tt3896198&apikey=c952ede0'

@Injectable()
export class Movies {

    constructor(private http: Http){

    }

    getMovies(): Observable<Movie>{
        return this.http.get(environment.apis.movies.moviesData).map((response) => {
            return response.json();
        }).catch(this.handleError);
    }

    handleError(error: any): Observable<Error>{               //On error, throw exception
        return Observable.throw(error);
    }
}
