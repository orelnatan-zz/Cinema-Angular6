import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../Models/Movie.modal';
import { Movies } from '../../Services/Movies.service';
import { Dispatcher } from '../../Services/Dispatcher.service';
import { MovieTitle } from '../../Pips/MovieTitle';

@Component({
  selector: 'home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  providers: [ MovieTitle, ]
})

export class Home {
    
    moviesList: Array<Movie>;
    movieId: number;
    movie: Movie;
  
    constructor(private moviesService: Movies,
                private movieTitlePipe: MovieTitle,
                private dispatcher: Dispatcher){
      
        this.dispatcher.onMovieSubmited().subscribe((movie: Movie) => {
            this.isMovieExist(movie.id) ? this.updateExistingMovie(movie) : this.createNewMovie(movie)
        })
    }
  
    ngOnInit(){
      this.moviesService.getAllMovies().subscribe((response: Array<Movie>) => {
          this.moviesList = response;
          this.dispatcher.dispatchLoaderToggled(false);
      })
    }
  
    handleRemove(id: number): void {
      this.movieId = id;
    }
  
    navigateToMovieSummary(id: number): void {
       this.dispatcher.dispatcRedirect({ 
          path: 'Cinema/MovieSummary', queryParams: {
            movieId: id,
          }
       });
    }
  
    openEditorModal(): void {
      this.movie = {} as Movie;
    }
  
    deleteMovie(id: number): void {
      let index = this.moviesList.findIndex(movie => movie.id == id);
      this.moviesList.splice(index, 1);
    }
  
    isMovieExist(id: number): boolean{
      return this.moviesList.map(movie => movie.id).indexOf(id) != -1 ? true : false;
    }
  
    isTitleExist(title: string, excludes: Array<string>): boolean {
      let transformedExcludes = excludes.map(title => this.movieTitlePipe.transform(title));
      let filterdList = this.moviesList.filter(item => !transformedExcludes.includes(this.movieTitlePipe.transform(item.title)));

      return filterdList.map(movie => this.movieTitlePipe.transform(movie.title))
             .indexOf(this.movieTitlePipe.transform(title)) != -1;
    }
  
    updateExistingMovie(updates: Movie): void {
      let currentMovie: Movie = this.moviesList.find(movie => movie.id == updates.id);
  
      if(this.isTitleExist(updates.title, [currentMovie.title])) {
          this.dispatcher.dispatchFailureToggled(true);
          return;
      }
  
      Object.keys(currentMovie).forEach((key) => {
          currentMovie[key] = updates[key];
      });
      
      this.dispatcher.dispatcRedirect({ 
          path: 'Cinema/Home', 
          queryParams: {}
      });
      this.dispatcher.dispatchSuccessToggled(true);
    }
  
    createNewMovie(movie: Movie): void {
      if(this.isTitleExist(movie.title, [])) {
        return;
      }
  
      movie.id = Math.max.apply(Math, this.moviesList.map(movie => movie.id)) + 1;
      this.moviesList.unshift(movie);
    }
}

