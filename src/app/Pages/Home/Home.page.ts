import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesSelectors, MoviesActions } from '../../Store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Movie } from '../../Models/Movie.model';
import { AppState } from '../../Store/AppState.model';
import { MovieTitle } from '../../Pips/MovieTitle';
import { Alert } from '../../Models/Alert.model';

const MOVIE_SUMMARY_URL: string = 'Cinema/MovieSummary';

@Component({
  selector: 'home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  providers: [ MovieTitle, ]
})

export class Home implements OnInit {
	moviesList$: Observable<Movie[]>;
	inProgress$: Observable<boolean>;
	failure$: Observable<Alert>;
	dialog$: Observable<Alert>;

	movieId: number;

    constructor(
		private store$: Store<AppState>,
		private router: Router,
	) {
		this.moviesList$ = this.store$.select (
			MoviesSelectors.getAllMovies,
		);

		this.inProgress$ = this.store$.select (
			MoviesSelectors.getMoviesinProgress,
    	);

    	this.failure$ = this.store$.select (
			MoviesSelectors.getMoviesFailure,
		);

		this.dialog$ = this.store$.select (
			MoviesSelectors.getMoviesDialog,
		);
	}

	ngOnInit(){
		this.store$.dispatch(
			new MoviesActions.LoadMovies(),
		);
	}

	showDeletionAlert(): void {
		this.store$.dispatch(
			new MoviesActions.MoviesDialog({
				dialog: {
					message: 'Sure you want to delete this movie?',
			 		isShown: true,
				}
			})
		)
	}
	  
	hideDialog(): void {
		this.store$.dispatch(
			new MoviesActions.MoviesDialog({
				dialog: { isShown: false, } as Alert
			})
		);
	}

	handleRemove(movieId: number): void {
		this.store$.dispatch(
			new MoviesActions.RemoveMovie({
				movieId: movieId,
			})
		);
  	}

	handleEdit(movieId: number): void {
		this.router.navigate([MOVIE_SUMMARY_URL], {
			queryParams: {
				movieId: movieId
			}
		})
  	}

	hideFailure(): void {
		this.store$.dispatch(
			new MoviesActions.MoviesLoadFailure({
				failure: { isShown: false } as Alert,
			})
		);
	}

}

