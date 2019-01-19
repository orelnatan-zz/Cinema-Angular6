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
import { AppState } from '../AppState.model';

import * as MoviesActions from './Actions';
import * as MoviesSelectors from './Selectors';

const TITLE_IS_ALREADY_EXIST_EXCEPTION: Alert = {
	isShown: true,
	message: 'Sorry, this title is already exist, try another...',
	code: 409
}

const SUCCESSFULLY_UPDATED: Alert = {
	isShown: true,
	message: 'Movie successfully updated!',
	code: 200
}

const SUCCESSFULLY_CREATED: Alert = {
	isShown: true,
	message: 'Movie successfully created!',
	code: 201
}

const NEW_FAVORITE_ADDED: Alert = {
	isShown: true,
	message: 'New favorite added!',
	code: 200
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
		switchMap((action: MoviesActions.Load): Observable<Action> => {
			const observer: Observable<Movie[] | Error> = this.getObserverByMode(
				action.payload.displayMode
			);
			return observer.pipe(
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
			)
		})
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
						   new MoviesActions.Update({
								submitedMovie,
								success: SUCCESSFULLY_UPDATED
						   }) : new MoviesActions.Failure({
							   failure: TITLE_IS_ALREADY_EXIST_EXCEPTION
						   })
				} else {
					return !this.isTitleExist(movies,  submitedMovie.title) ? 
							new MoviesActions.Create({
								submitedMovie,
								success: SUCCESSFULLY_CREATED
							}) : new MoviesActions.Failure({
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
	UpdateOrCreated: Observable<Action> = this.actions$.pipe(
		ofType<MoviesActions.Update | MoviesActions.Create>(
			MoviesActions.ActionTypes.UPDATE,
			MoviesActions.ActionTypes.CREATE
		),
		tap(() => {
			this.router.navigate([HOME_URL]);
		})
	);

	@Effect()
    ToggleFavorite$: Observable<Action> = this.actions$.pipe(
        ofType<MoviesActions.Toggle>(
            MoviesActions.ActionTypes.TOGGLE
        ),
        switchMap((action: MoviesActions.Toggle) => this.localStorage.getUserFavorites().pipe(
			map((movies: Array<Movie>) => {
				return this.getMovieById(movies ,action.payload.movie.id) ? 
						new MoviesActions.UnFavorite({
							favoriteId: action.payload.movie.id,
						}) : new MoviesActions.Favorite({
							movie: action.payload.movie,
							success: NEW_FAVORITE_ADDED
						})
			}),
			catchError((error: Alert) => {
				return observableOf(new MoviesActions.Rejected({
                    failure: error
                }))
			})
		))
	);

	@Effect({ dispatch: false })
	Favorite: Observable<Action> = this.actions$.pipe(
		ofType<MoviesActions.Favorite>(
			MoviesActions.ActionTypes.FAVORITE
		),
		tap((action: MoviesActions.Favorite) => {
			this.localStorage.addFavorite(
				action.payload.movie
			)
		})
	);

	@Effect()
    unFavorite$: Observable<Action> = this.actions$.pipe(
        ofType<MoviesActions.UnFavorite>(
            MoviesActions.ActionTypes.UNFAVORITE
        ),
        switchMap((action: MoviesActions.UnFavorite): Observable<Action> => {
			this.localStorage.removeFavorite(action.payload.favoriteId);
			return this.localStorage.getUserFavorites().pipe(
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
			)
		} 
	))

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
		const titles: Array<string> = exclude ? 
			  movies.map((movie: Movie) => movie.title)
					.filter((title: string) => title != exclude) : 
			  movies.map((movie: Movie) => movie.title);
		return titles.indexOf(title) != -1;
	}

	private getObserverByMode(
		payloadType: string
	): Observable<Movie[] | Error> {
		switch(payloadType) {
			case 'Default':{
				return this.movies.getMovies();
			};			 
			case 'Favorites': {
				 return this.localStorage.getUserFavorites();
			}; 
			default: {
				return this.movies.getMovies();
			};
		};
	}

}
