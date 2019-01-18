import { Injectable, OnInit }  from '@angular/core';
import { Http, } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';   // npm install rxjs-compat
import { MoviesActions, MoviesSelectors } from '../Store';
import { environment } from '../../environments/environment';
import { Alert } from '../Models/Alert.model';
import { Movie } from '../Models/Movie.model';
import { AppState } from '../Store/AppState.model';

const IMAGE_PREFIX: string = "https://image.tmdb.org/t/p/w500";

const UNAUTHORIZED_EXCEPTION: Alert = {
	code: 401,
	message: '401 (Unauthorized) Invalid API key: You must be granted a valid key.',
	isShown: true,
}

@Injectable()
export class Movies {
    movies: Array<Movie>;

	constructor(
		private http: Http,
		private store$: Store<AppState>
	) {
		this.store$.select(							// Listening to movies state changes ...
			MoviesSelectors.getAllMovies
		).subscribe((movies: Array<Movie>) => {
			this.movies = movies;
		});
	}

    public getMovies(): Observable<Movie[] | Error> {
        return this.movies.length ? new Observable((observer) => {
            observer.next(this.movies);
            observer.complete();
        }) : this.http.get(environment.apis.movies.moviesData).map((response) => {
            	return this.normalizeData(response.json().results);
        }).catch(this._handleError).delay(2000);
    }

    private _handleError(error: any): Observable<Error> {               // On error, throw exception
		return Observable.throw(UNAUTHORIZED_EXCEPTION);
    }

    private normalizeData(data: Array<Movie>): Array<Movie> {
        return data.map(item => {
            item.poster_path = IMAGE_PREFIX.concat(item.poster_path)
            return item;
        })
    }
}

