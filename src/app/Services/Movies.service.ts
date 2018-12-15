import { Http, Response, } from '@angular/http';
import { Injectable, }  from '@angular/core';
import { Dispatcher } from '../Services/Dispatcher.service';
import { Observable } from 'rxjs/Rx';   // npm install rxjs-compat
import { environment } from '../../environments/environment';
import { Movie } from '../Models/Movie.model';


const IMAGE_PREFIX: string = "https://image.tmdb.org/t/p/w500";

@Injectable()
export class Movies {
    movies: Array<Movie>;

    constructor(private http: Http,
                private dispatcher: Dispatcher){

        this.dispatcher.onDataChanged().subscribe((movies: Array<Movie>) => {
            this.movies = movies;
        })

    }

    public getMovieById(movieId: number): Observable<Movie | Error> {
        return this.movies ? new Observable((observer) => {
            observer.next(this.movies.find((movie: Movie) => movie.id == movieId));
            observer.complete();
        }) : new Observable((observer) => {
            this.getAllMovies().subscribe((response: Array<Movie>) => {
                observer.next(response.find((movie: Movie) => movie.id == movieId));
                observer.complete();
            });
        });
    }

    public getAllMovies(): Observable<Movie[] | Error> {
        return this.movies ? new Observable((observer) => {
            observer.next(this.movies);
            observer.complete(); this.getMovies();
        }) : this.getMovies();
    }

    private getMovies(): Observable<Movie[] | Error> {
        return this.http.get(environment.apis.movies.moviesData).map((response) => {
            return this.normalizeData(response.json().results);
        }).catch(this.handleError).delay(2000);
    }

    private handleError(error: any): Observable<Error> {               //On error, throw exception
        return Observable.throw(error);
    }
 
    private normalizeData(data: Array<Movie>): Array<Movie> {     
        return data.map(item => {
            item.poster_path = IMAGE_PREFIX.concat(item.poster_path)
            return item;
        })
    }
}

