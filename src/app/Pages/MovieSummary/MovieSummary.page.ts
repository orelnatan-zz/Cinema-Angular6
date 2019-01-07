import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesSelectors, MoviesActions } from '../../Store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../Models/Movie.model';
import { AppState } from '../../Store/AppState.model';
import { Status } from '../../Models/Status.model';
import { Loader } from '../../Modals/Loader';
import { Failure } from '../../Modals/Failure';
import { Success } from '../../Modals/Success';

const Home_URL: string = 'Cinema/Home';
const ERROR_NOTIFICATION: string = 'Server Error: unable to find movie, redirecting home page.';

@Component({
  selector: 'movie-summary',
  templateUrl: './MovieSummary.page.html',
  styleUrls: ['./MovieSummary.page.scss']
})

export class MovieSummary implements OnInit {
  @ViewChild('loaderRef') loaderRef: Loader;
  @ViewChild('failureRef') failureRef: Failure;

  moviesList$: Observable<Movie[]>;
	isPending$: Observable<boolean>;
  status$: Observable<Status>;

  movie: Movie;
  renderPage: boolean;

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  ngOnInit() {
      this.store$.dispatch(
          new MoviesActions.LoadMovies(),
      );

      this.isPending$.subscribe((isPending: boolean) => {
          isPending ? this.loaderRef.showLoader() : this.loaderRef.hideLoader();
      })



  }

  private handleFailure(): void {
      this.failureRef.showFailure(ERROR_NOTIFICATION);
      this.router.navigate([Home_URL], {
          queryParams: {}
      });
  }



}

