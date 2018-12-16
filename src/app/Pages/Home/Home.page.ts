import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Models/Movie.model';
import { Movies } from '../../Services/Movies.service';
import { Dispatcher } from '../../Services/Dispatcher.service';
import { MovieTitle } from '../../Pips/MovieTitle';

const MOVIE_SUMMARY_PATH: string = 'Cinema/MovieSummary';

@Component({
  selector: 'home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  providers: [ MovieTitle, ]
})

export class Home implements OnInit {

    moviesList: Array<Movie>;

    constructor(private moviesService: Movies,
                private dispatcher: Dispatcher){

        this.dispatcher.onDataChanged().subscribe((movies: Array<Movie>) => {
          this.moviesList = movies;
        })
    }

    ngOnInit() {
        this.dispatcher.dispatchPending(true);

        this.moviesService.getMovies().subscribe((response: Array<Movie>) => {
            this.moviesList = response;
            this.dispatcher.dispatchPending(false);
        })
    }

    navigateToMovieSummary(id: number): void {
        this.dispatcher.dispatcRedirect({
            path: MOVIE_SUMMARY_PATH,
            queryParams: {
                movieId: id,
            }
        });
    }

    handleRemove(id: number): void {
        this.dispatcher.dispatchDelete(id);
    }

}

