import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesSelectors, MoviesActions } from '../../Store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../Models/Movie.model';
import { AppState } from '../../Store/AppState.model';
import { Loader } from '../../Modals/Loader';
import { Failure } from '../../Modals/Failure';
import { Success } from '../../Modals/Success';

const Home_URL: string = 'Cinema/Home';
const ERROR_NOTIFICATION: string = 'Server Error: unable to find movie, click to redirect home page.';

@Component({
  selector: 'movie-summary',
  templateUrl: './MovieSummary.page.html',
  styleUrls: ['./MovieSummary.page.scss']
})

export class MovieSummary implements OnInit {
  @ViewChild('loaderRef') loaderRef: Loader;
  @ViewChild('failureRef') failureRef: Failure;

  inProgress$: Observable<boolean>;

  movie: Movie;
  renderPage: boolean;

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
		this.activatedRoute.queryParams.subscribe((params: object) => {
			this.store$.select(MoviesSelectors.getAllMovies)
				.subscribe((movies: Array<Movie>) => {
					if(!movies.length) return;
					console.log(movies)
					const shownMovie: Movie = movies.find((movie: Movie) => movie.id == params['movieId']);
					this.movie = params['movieId'] ? shownMovie ? { ...shownMovie } : null : {} as Movie;

					if(!this.movie){
						// this.failureRef.showFailure(ERROR_NOTIFICATION);
						return;
					}
					this.renderPage = true;
				})
		})

		this.inProgress$ = this.store$.select (
			MoviesSelectors.getMoviesinProgress,
		);
    }

	ngOnInit() {
		this.store$.dispatch(
			new MoviesActions.LoadMovies(),
		);

	}

	private redirectHome(): void {
		this.router.navigate([Home_URL], {
			queryParams: {}
		});
	}



}

