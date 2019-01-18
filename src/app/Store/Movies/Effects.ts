import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, startWith, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Movies } from '../../Services/Movies.service';
import { LocalStorage } from '../../Services/LocalStorage.service';
import { Movie } from '../../Models/Movie.model';
import { Alert } from '../../Models/Alert.model';

import * as MoviesActions from './Actions';
import { AppState } from '../AppState.model';

const TITLE_IS_ALREADY_EXIST_EXCEPTION: Alert = {
	isShown: true,
	message: 'Sorry, this title is already exist, try another...',
	code: 409
}

const HOME_URL: string = 'Cinema/Home';

@Injectable()
export class MoviesEffects {
	constructor(
		private router: Router,
		private movies: Movies,
		private localStorage: LocalStorage,
        private actions$: Actions,
        private store$: Store<AppState>,
    ) {}

	@Effect()
    Load$: Observable<Action> = this.actions$.pipe(
        ofType<MoviesActions.Load>(
            MoviesActions.ActionTypes.LOAD
        ),
        switchMap(() => this.movies.getMovies().pipe(
			map((movies: Array<Movie>) => {
				return new MoviesActions.Ready({
					movies: movies,
				})
			}),
			catchError((error: Alert) => {
				return observableOf(new MoviesActions.Rejected({
                    failure: error
                }))
			})
		))
	);

	@Effect()
    Submit$: Observable<Action> = this.actions$.pipe(
        ofType<MoviesActions.Submit>(
            MoviesActions.ActionTypes.SUBMIT
        ),
        switchMap((action: MoviesActions.Submit) => this.movies.getMovies().pipe(
			map((movies: Array<Movie>) => {
				const submitedMovie: Movie = action.payload.movie;
				const originMovie: Movie = this.getMovieById(movies, submitedMovie.id);

				if(originMovie){
					return !this.isTitleExist(movies,  submitedMovie.title, originMovie.title) ? 
						   new MoviesActions.UpdateMovie({
								submitedMovie,
						   }) : new MoviesActions.MoviesFailure({
							   failure: TITLE_IS_ALREADY_EXIST_EXCEPTION
						   })
				} else {
					return !this.isTitleExist(movies,  submitedMovie.title) ? 
							new MoviesActions.CreateMovie({
								submitedMovie,
							}) : new MoviesActions.MoviesFailure({
								failure: TITLE_IS_ALREADY_EXIST_EXCEPTION
							})
				}
			}),
			catchError((error: Alert) => {
				return observableOf(new MoviesActions.Rejected({
                    failure: error
                }))
			})
		))
	);

	@Effect({ dispatch: false })
	Update: Observable<Action> = this.actions$.pipe(
		ofType<MoviesActions.UpdateMovie>(
			MoviesActions.ActionTypes.UPDATE_MOVIE
		),
		tap(() => {
			this.router.navigate([HOME_URL]);
		})
	);

	private getMovieById(
		movies:Array<Movie>, 
		movieId: number
	): Movie {
		return movies.find((
			movie: Movie) => movie.id == movieId
		);
	}

	private isTitleExist(
		movies: Array<Movie>, 
		title: string, 
		exclude: string = null
	): boolean {
		const titles: Array<string> = exclude ? movies.map((movie: Movie) => movie.title)
													  .filter((title: string) => title != exclude) : 
												movies.map((movie: Movie) => movie.title);
		return titles.indexOf(title) != -1;
	}

}
