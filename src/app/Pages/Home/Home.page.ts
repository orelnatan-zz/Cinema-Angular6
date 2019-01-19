import { Component } from '@angular/core';
import { MoviesSelectors, MoviesActions } from '../../Store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Movie } from '../../Models/Movie.model';
import { AppState } from '../../Store/AppState.model';
import { MovieTitle } from '../../Pips/MovieTitle';
import { Alert } from '../../Models/Alert.model';

const MOVIE_SUMMARY_URL: string = 'Cinema/MovieSummary';

const REMOVE_ALERT: Alert = {
	message: 'Sure you want to delete this movie?',
	isShown: true,
	code: null,
}

const SUCCESSFULLY_REMOVED: Alert = {
	isShown: true,
	message: 'movie successfully removed!',
	code: 200
}

@Component({
  selector: 'home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  providers: [ MovieTitle, ]
})

export class Home {
	moviesList$: Observable<Movie[]>;
	inProgress$: Observable<boolean>;
    dialog$: Observable<Alert>;
    success$: Observable<Alert>;

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

		this.dialog$ = this.store$.select (
			MoviesSelectors.getDialog,
        );

        this.success$ = this.store$.select (
			MoviesSelectors.getSuccess,
		);
	}

	showDeletionAlert(): void {
		this.store$.dispatch(
			new MoviesActions.Dialog({
				dialog: REMOVE_ALERT
			})
		)
	}

	hideDialog(): void {
		this.store$.dispatch(
			new MoviesActions.Dialog({
				dialog: { isShown: false, } as Alert
			})
		);
	}

	handleRemove(movieId: number): void {
		this.store$.dispatch(
			new MoviesActions.Remove({
                movieId: movieId,
                success: SUCCESSFULLY_REMOVED
			})
		);
  	}

    navigateToMovieSummary(movieId: number): void {
        this.router.navigate([MOVIE_SUMMARY_URL], {
            queryParams: {
                movieId: movieId
            }
        })
  	}

    hideSuccess(): void {
		this.store$.dispatch(
			new MoviesActions.Success({
				success: { isShown: false } as Alert,
			})
		);
	}

	toggleFavorite(movie: Movie): void {
		this.store$.dispatch(
			new MoviesActions.Toggle({
				movie: movie,
			})
		);
	}

}

