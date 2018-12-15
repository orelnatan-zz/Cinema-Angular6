import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../Models/Movie.model';
import { Movies } from '../../Services/Movies.service';
import { Dispatcher } from '../../Services/Dispatcher.service';
import { MovieTitle } from '../../Pips/MovieTitle';

@Component({
  selector: 'home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  providers: [ MovieTitle, ]
})

export class Home implements OnInit {
    
    moviesList: Array<Movie>;
   
    constructor(private moviesService: Movies,
                private movieTitlePipe: MovieTitle,
                private dispatcher: Dispatcher){
      
        this.dispatcher.onDataChanged().subscribe((movies: Array<Movie>) => {
          this.moviesList = movies;
        })
    }
    
    ngOnInit() {
        this.dispatcher.dispatchLoaderToggled(true);

        this.moviesService.getAllMovies().subscribe((response: Array<Movie>) => {
            this.moviesList = response;
            this.dispatcher.dispatchLoaderToggled(false);
        })
    }

    navigateToMovieSummary(id: number): void {
        this.dispatcher.dispatcRedirect({ 
          path: 'Cinema/MovieSummary', queryParams: {
            movieId: id,
          }
        });
    }
  
    
}

