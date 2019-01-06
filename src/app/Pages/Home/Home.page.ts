import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesSelectors, MoviesActions } from '../../Store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../Models/Movie.model';
import { Status } from '../../Models/Status.model';
import { AppState } from '../../Store/AppState.model';
import { MovieTitle } from '../../Pips/MovieTitle';
import { Loader } from '../../Modals/Loader';
import { Success } from '../../Modals/Success';

@Component({
  selector: 'home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  providers: [ MovieTitle, ]
})

export class Home implements OnInit {
	DELETION_ALERT: string = 'Sure you want to delete this movie?';
	MOVIE_SUMMARY_URL: string = 'Cinema/MovieSummary';

	@ViewChild('loaderRef') loaderRef: Loader;
	@ViewChild('successRef') successRef: Success;
	
	moviesList$: Observable<Movie[]>;
	isPending$: Observable<boolean>;
	status$: Observable<Status>;

	movieId: number;

    constructor(
		private store$: Store<AppState>,
	) {
		this.moviesList$ = this.store$.select (
			MoviesSelectors.getAllMovies,
		);
		
		this.isPending$ = this.store$.select (
			MoviesSelectors.getIsPending,
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
	}

	handleRemove(movieId: number): void{
		this.store$.dispatch(
			new MoviesActions.RemoveMovie({
				movieId: movieId,
			})
		);
		this.successRef.showSuccess('Done!');
	}

}

