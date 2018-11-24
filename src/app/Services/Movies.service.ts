import { Http, } from '@angular/http';
import { Injectable, }  from '@angular/core';
import { Observable } from 'rxjs/Rx';   // npm install rxjs-compat
import { environment } from '../../environments/environment';
import { Movie } from '../Models/Movie.modal';

const IMAGE_PREFIX: string = "https://image.tmdb.org/t/p/w500";

@Injectable()
export class Movies {

    constructor(private http: Http){

    }

    getMovies(): Observable<Movie[]> {
        return this.http.get(environment.apis.movies.moviesData).map((response) => {
            return this.normalizeData(response.json().results);
        }).catch(this.handleError);
    }

    handleError(error: any): Observable<Error> {               //On error, throw exception
        return Observable.throw(error);
    }
 
    normalizeData(data: Array<Movie>): any {     // any ???
            data.forEach((movie: Movie) => {
                    let imagePath: string = movie.poster_path;
                    movie.poster_path = IMAGE_PREFIX.concat(imagePath);
            })
        return data;
    }
}
