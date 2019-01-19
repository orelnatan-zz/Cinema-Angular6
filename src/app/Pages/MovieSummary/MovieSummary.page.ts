import { Component, OnInit, } from '@angular/core';
import { MoviesSelectors, MoviesActions } from '../../Store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../Models/Movie.model';
import { AppState } from '../../Store/AppState.model';
import { Alert } from '../../Models/Alert.model';

const HOME_URL: string = 'Cinema/Home';

const NOT_FOUND_EXCEPTION: Alert = {
	isShown: true,
	message: 'Server Error: unable to find movie, redirect home page.',
	code: 404,
}

@Component({
  selector: 'movie-summary',
  templateUrl: './MovieSummary.page.html',
  styleUrls: ['./MovieSummary.page.scss']
})

export class MovieSummary implements OnInit {
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
				
				this.movie = { ... movies.find((movie: Movie) => movie.id == params['movieId']) };

				if(!Object.keys(this.movie).length){
					this.redirectHome();
					
					this.store$.dispatch(
						new MoviesActions.Failure({
							failure: NOT_FOUND_EXCEPTION,
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
	
	ngOnInit() {
		this.router.events.subscribe(() => {
			this.movie = {} as Movie;
		})
	}

	redirectHome(): void {
		this.router.navigate([HOME_URL], {
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

