import { Component, } from '@angular/core';
import { MoviesSelectors, MoviesActions } from '../../Store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../Models/Movie.model';
import { AppState } from '../../Store/AppState.model';

const Home_URL: string = 'Cinema/Home';
const ERROR_NOTIFICATION: string = 'Server Error: unable to find movie, redirect home page.';

@Component({
  selector: 'movie-summary',
  templateUrl: './MovieSummary.page.html',
  styleUrls: ['./MovieSummary.page.scss']
})

export class MovieSummary {
  inProgress$: Observable<boolean>;

  movie: Movie = {} as Movie;
  renderPage: boolean;

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
		this.activatedRoute.queryParams.subscribe((params: object) => {
            if(!params['movieId']){
                this.renderPage = true;
                return;
            }
			this.store$.select(MoviesSelectors.getAllMovies).subscribe((movies: Array<Movie>) => {
				if(!movies.length) return;
				console.log(movies);
				this.movie = { ... movies.find((movie: Movie) => movie.id == params['movieId']) };
				if(!this.movie){
					this.redirectHome();
					
					this.store$.dispatch(
						new MoviesActions.MoviesFailure({
							failure: {
								isShown: true,
								message: ERROR_NOTIFICATION,
								code: 401,
							},
						})
					);
					return;
				}
				this.renderPage = true;
			})
		})

		this.inProgress$ = this.store$.select (
			MoviesSelectors.getMoviesinProgress,
		);
    }

	redirectHome(): void {
		this.router.navigate([Home_URL], {
			queryParams: {}
		});
    }

    handleSubmit(movie: Movie): void {
		this.store$.dispatch(
			new MoviesActions.Submit({
				movie: movie
			})
		);
    }

}

