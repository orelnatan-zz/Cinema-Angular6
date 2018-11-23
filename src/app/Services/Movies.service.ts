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

    getMovies(): Observable<Movie[]>{
        return this.http.get(environment.apis.movies.moviesData).map((response) => {
            return this.normalizeData(response.json().results);
        }).catch(this.handleError);
    }

    handleError(error: any): Observable<Error>{               //On error, throw exception
        return Observable.throw(error);
    }

    normalizeData(data: Array<Movie>): any{
        const languagesIds = {
            en: 1, es: 2, fr: 3,
            de: 4, js: 5, hi: 6, he: 7
        };
        
        data.forEach((movie: Movie) => {
            let imagePath: string = movie.poster_path;
            let language: string = String(movie.original_language);
            let releaseDate: string = movie.release_date;
    
            movie.poster_path = IMAGE_PREFIX.concat(imagePath);
            movie.original_language = { label: String(language), id: languagesIds[language] };
        })

        return data;
    }
}
