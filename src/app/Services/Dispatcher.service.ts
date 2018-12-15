import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { Movie } from '../Models/Movie.modal';
import { Route } from '../Models/Route.modal';

@Injectable()
export class Dispatcher {
    @Output() redirect: EventEmitter<Route> = new EventEmitter();
    @Output() movieSubmited: EventEmitter<Movie> = new EventEmitter();
    @Output() loaderToggled: EventEmitter<boolean> = new EventEmitter();
    @Output() successToggled: EventEmitter<boolean> = new EventEmitter();
    @Output() failureToggled: EventEmitter<boolean> = new EventEmitter();

    /////////////////////////////////////////////// Events launchers ///////////////////////////////////////////////
    public dispatcRedirect(route: Route): void {
        this.redirect.emit(route);
    }

    public dispatchMovieSubmited(movie: Movie): void {
        this.movieSubmited.emit(movie);
    }

    public dispatchLoaderToggled(isActive: boolean): void {
        this.loaderToggled.emit(isActive);
    }

    public dispatchSuccessToggled(isActive: boolean): void {
        this.successToggled.emit(isActive);
    }

    public dispatchFailureToggled(isActive: boolean): void {
        this.failureToggled.emit(isActive);
    }

    /////////////////////////////////////////////// Events listeners ///////////////////////////////////////////////
    public onRedirect(): EventEmitter<Route> {
        return this.redirect;
    }

    public onMovieSubmited(): EventEmitter<Movie> {
        return this.movieSubmited;
    }

    public onLoaderToggled(): EventEmitter<boolean> {
        return this.loaderToggled;
    }

    public onSuccessToggled(): EventEmitter<boolean> {
        return this.successToggled;
    }

    public onFailureToggled(): EventEmitter<boolean> {
        return this.failureToggled;
    }
}