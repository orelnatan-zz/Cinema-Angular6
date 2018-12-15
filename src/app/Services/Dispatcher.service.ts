import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { Movie } from '../Models/Movie.model';
import { Route } from '../Models/Route.model';

@Injectable()
export class Dispatcher {
    @Output() redirect: EventEmitter<Route> = new EventEmitter();
    @Output() dataChanged: EventEmitter<Movie[]> = new EventEmitter();
    @Output() edit: EventEmitter<Movie> = new EventEmitter();
    @Output() delete: EventEmitter<Number> = new EventEmitter();
    @Output() pending: EventEmitter<Boolean> = new EventEmitter();
    @Output() error: EventEmitter<String> = new EventEmitter();
    
    /////////////////////////////////////////////// Events launchers ///////////////////////////////////////////////
    public dispathDataChanged(data: Array<Movie>): void {
        this.dataChanged.emit(data);
    }

    public dispatcRedirect(route: Route): void {
        this.redirect.emit(route);
    }

    public dispatchEdit(movie: Movie): void {
        this.edit.emit(movie);
    }

    public dispatchDelete(id: Number): void {
        this.delete.emit(id);
    }

    public dispatchPending(isActive: Boolean): void {
        this.pending.emit(isActive);
    }

    public dispatchError(notification: String): void {
        this.error.emit(notification);
    }

    /////////////////////////////////////////////// Events listeners ///////////////////////////////////////////////
    public onDataChanged(): EventEmitter<Movie[]> {
        return this.dataChanged;
    }

    public onRedirect(): EventEmitter<Route> {
        return this.redirect;
    }

    public onEdit(): EventEmitter<Movie> {
        return this.edit;
    }

    public onDelete(): EventEmitter<Number> {
        return this.delete;
    }

    public onPending(): EventEmitter<Boolean> {
        return this.pending;
    }

    public onError(): EventEmitter<String> {
        return this.error;
    }
}