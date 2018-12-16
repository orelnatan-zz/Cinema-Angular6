import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../../Services/Movies.service';
import { Dispatcher } from '../../Services/Dispatcher.service';
import { Movie } from '../../Models/Movie.model';

const HOME_PATH: string = 'Cinema/Home';
const ERROR_NOTIFICATION: string = 'Server Error: unable to find movie, redirecting home page.';
@Component({
  selector: 'movie-summary',
  templateUrl: './MovieSummary.page.html',
  styleUrls: ['./MovieSummary.page.scss']
})

export class MovieSummary implements OnInit {
  movie: Movie;
  renderPage: boolean;

  constructor(private movies: Movies,
              private dispatcher: Dispatcher,
              private route: ActivatedRoute){

  }

  ngOnInit() {
    this.dispatcher.dispatchPending(true);

    this.route.queryParams.subscribe((params) => {
        this.movies.getMovies().subscribe((response: Movie[]) => {
            const shownMovie: Movie = response.find((movie: Movie) => movie.id == params.movieId);
            this.movie = params.movieId ? shownMovie ? { ...shownMovie } : null : {} as Movie;

            if(!this.movie){
              this.dispatcher.dispatchError(ERROR_NOTIFICATION);
              this.navigateToHomePage();
              return;
            }

            this.dispatcher.dispatchPending(false);
            this.renderPage = true;
        })
    });
  }

  navigateToHomePage(){
    this.dispatcher.dispatcRedirect({
        path: HOME_PATH,
        queryParams: {}
    });
  }

  onSubmit(movie: Movie){
    this.dispatcher.dispatchEdit(movie);
  }

}

