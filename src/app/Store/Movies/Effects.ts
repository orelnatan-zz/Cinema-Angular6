import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, startWith, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Movies } from '../../Services/Movies.service';
import { LocalStorage } from '../../Services/LocalStorage.service';

import * as MoviesActions from './Actions';
import { Movie } from '../../Models/Movie.model';


@Injectable()
export class MoviesEffects {

	constructor(
		private router: Router,
		private movies: Movies,
		private localStorage: LocalStorage,
        private actions$: Actions
    ) {}

	@Effect()
    loadMovies$: Observable<Action> = this.actions$.pipe(
        ofType<MoviesActions.LoadMovies>(
            MoviesActions.ActionTypes.LOAD_MOVIES
        ),
        switchMap(() => this.movies.getMovies().pipe(
				map((movies: Array<Movie>) => {
					return new MoviesActions.MoviesLoadSuccess({
						movies: movies,
						showFailure: false,
					})
				}),
				catchError((error: boolean) => {
          console.log('effects', error)
					return observableOf(new MoviesActions.MoviesLoadFailure({
            showFailure: true,
					}))
				})))
	);



}
