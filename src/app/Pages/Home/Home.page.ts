import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesSelectors, MoviesActions } from '../../Store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../../Models/Movie.model';
import { Status } from '../../Models/Status.model';
import { AppState } from '../../Store/AppState.model';
import { MovieTitle } from '../../Pips/MovieTitle';
import { Loader } from '../../Modals/Loader';
import { Success } from '../../Modals/Success';
import { Failure } from '../../Modals/Failure';

const MOVIE_SUMMARY_URL: string = 'Cinema/MovieSummary';

@Component({
  selector: 'home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  providers: [ MovieTitle, ]
})

export class Home implements OnInit {
	DELETION_ALERT: string = 'Sure you want to delete this movie?';

	@ViewChild('loaderRef') loaderRef: Loader;
	@ViewChild('successRef') successRef: Success;
	@ViewChild('failureRef') failureRef: Failure;

	moviesList$: Observable<Movie[]>;
	isPending$: Observable<boolean>;
	status$: Observable<Status>;

	movieId: number;

    constructor(
      private store$: Store<AppState>,
      private router: Router,
      private activatedRoute: ActivatedRoute
	) {
		this.moviesList$ = this.store$.select (
			MoviesSelectors.getAllMovies,
		);

		this.isPending$ = this.store$.select (
			MoviesSelectors.getMoviesIsPending,
		);

		this.status$ = this.store$.select (
			MoviesSelectors.getMoviesStatus,
		);
	}

	ngOnInit(){
		this.store$.dispatch(
			new MoviesActions.LoadMovies(),
		);

		this.isPending$.subscribe((isPending: boolean) => {
			isPending ? this.loaderRef.showLoader() : this.loaderRef.hideLoader();
		})

		this.status$.subscribe((status: Status) => {
			status && status.failure ? this.failureRef.showFailure(status.description) : null;
		})
	}

	handleRemove(movieId: number): void {
		this.store$.dispatch(
			new MoviesActions.RemoveMovie({
				movieId: movieId,
			})
		);
		this.successRef.showSuccess('Done!');
    }

	handleEdit(movieId: number): void {
		this.router.navigate([MOVIE_SUMMARY_URL], {
			queryParams: {
				movieId: movieId
			}
		})
	}

}

