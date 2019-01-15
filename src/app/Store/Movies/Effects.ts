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



}
