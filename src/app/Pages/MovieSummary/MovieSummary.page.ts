import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../../Services/Movies.service';
import { Dispatcher } from '../../Services/Dispatcher.service';
import { Movie } from '../../Models/Movie.model';


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
    this.dispatcher.dispatchLoaderToggled(true);

    this.route.queryParams.subscribe((params) => {
        this.movies.getMovieById(params.movieId).subscribe((response: Movie) => {
            this.movie = response;

            this.dispatcher.dispatchLoaderToggled(false);
            this.renderPage = true;
        })
    });
  }

  navigateToHomePage(){
    this.dispatcher.dispatcRedirect({ 
        path: 'Cinema/Home', 
        queryParams: {}
    });
  }

  onSubmit(movie: Movie){
    this.dispatcher.dispatchMovieSubmited(movie);
  }

}

