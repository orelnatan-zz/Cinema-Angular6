import { Http, } from '@angular/http';
import { Injectable, }  from '@angular/core';
import { Observable } from 'rxjs/Rx';   // npm install rxjs-compat
import { environment } from '../../environments/environment';
import { Movie } from '../Models/Movie.modal';

const IMAGE_PREFIX: string = "https://image.tmdb.org/t/p/w500";

@Injectable()
export class Movies {

    constructor(private http: Http){}

    getMovies(): Observable<Movie[] | Error> {
        return this.http.get(environment.apis.movies.moviesData).map((response) => {
            return this.normalizeData(response.json().results);
        }).catch(this.handleError);
    }

    handleError(error: any): Observable<Error> {               //On error, throw exception
        return Observable.throw(error);
    }
 
    normalizeData(data: Array<Movie>): Array<Movie> {     
        return data.map(item => {
            item.poster_path = IMAGE_PREFIX.concat(item.poster_path)
            return item;
        })
    }
}

