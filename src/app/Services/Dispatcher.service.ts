import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { Movie } from '../Models/Movie.model';
import { Route } from '../Models/Route.model';

@Injectable()
export class Dispatcher {
    @Output() redirect: EventEmitter<Route> = new EventEmitter();
    @Output() dataChanged: EventEmitter<Movie[]> = new EventEmitter();
    @Output() movieSubmited: EventEmitter<Movie> = new EventEmitter();
    
    @Output() loaderToggled: EventEmitter<boolean> = new EventEmitter();
    @Output() successToggled: EventEmitter<boolean> = new EventEmitter();
    @Output() failureToggled: EventEmitter<boolean> = new EventEmitter();

    /////////////////////////////////////////////// Events launchers ///////////////////////////////////////////////
    public dispathDataChanged(data: Array<Movie>): void {
        this.dataChanged.emit(data);
    }

    public dispatcRedirect(route: Route): void {
        this.redirect.emit(route);
    }

    public dispatchMovieSubmited(movie: Movie): void {
        this.movieSubmited.emit(movie);
    }

    public dispatchLoaderToggled(isActive: boolean): void {
        this.loaderToggled.emit(isActive);
    }

   

    /////////////////////////////////////////////// Events listeners ///////////////////////////////////////////////
    public onDataChanged(): EventEmitter<Movie[]> {
        return this.dataChanged;
    }

    public onRedirect(): EventEmitter<Route> {
        return this.redirect;
    }

    public onMovieSubmited(): EventEmitter<Movie> {
        return this.movieSubmited;
    }

    public onLoaderToggled(): EventEmitter<boolean> {
        return this.loaderToggled;
    }

    
}