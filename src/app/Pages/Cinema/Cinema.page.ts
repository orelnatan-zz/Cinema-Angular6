import { Component, ViewChild, OnInit } from '@angular/core';
import { Movies } from '../../Services/Movies.service';
import { Movie } from '../../Models/Movie.modal';
import { MovieTitle } from '../../Pips/MovieTitle';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
  providers: [ Movies, MovieTitle, ]
})

export class Cinema implements OnInit {
  showLoader: boolean;
  showDialog: boolean;
  showSuccess: boolean;
  showEditor: boolean;
  showFailure: boolean;

  moviesList: Array<Movie>;
  movieId: number;
  movie: Movie;

  constructor(private moviesService: Movies, 
              private movieTitlePipe: MovieTitle){
    
  }

  ngOnInit(){
    this.showLoader = true;

    this.moviesService.getMovies().subscribe((response: any) => {
        this.moviesList = response;
        this.showLoader = false; 
    })
  }

  handleRemove(id: number): void {
    this.movieId = id;
    this.showDialog = true;
  }

  handleEdit(id: number): void {
    this.movie = {...this.moviesList.find(movie => movie.id == id)};      //Copy book by value only...
    this.showEditor = true;
  }

  openEditorModal(): void {
    this.movie = this.initializeNewMovie();
    this.showEditor = true;
  }

  deleteMovie(id: number): void {
    let index = this.moviesList.findIndex(movie => movie.id == id);
    this.moviesList.splice(index, 1);

    this.showDialog = false;
    this.showSuccess = true;
  }

  isMovieExist(id: number): boolean{
    return this.moviesList.map(movie => movie.id).indexOf(id) != -1 ? true : false;
  }

  isTitleExist(title: string, excludes: Array<string>): boolean {
    let transformedExcludes = excludes.map(title => this.movieTitlePipe.transform(title));
    let filterdList = this.moviesList.filter(item => !transformedExcludes.includes(this.movieTitlePipe.transform(item.title)));
       
    return filterdList.map(movie => this.movieTitlePipe.transform(movie.title))
           .indexOf(this.movieTitlePipe.transform(title)) != -1 ? true : false; 
  }

  updateExistingMovie(updates: Movie): void {
    let currentMovie: Movie = this.moviesList.find(movie => movie.id == updates.id);
    
    if(this.isTitleExist(updates.title, [currentMovie.title])) {
        this.showFailure = true;
        return;
    }

    Object.keys(currentMovie).forEach((key) => { 
        currentMovie[key] = updates[key]; 
    });
    this.showEditor = false;
    this.showSuccess = true;
  }
  
  createNewMovie(movie: Movie): void {
    if(this.isTitleExist(movie.title, [])) {
      this.showFailure = true;
      return;
    }

    this.moviesList.unshift(movie);
    this.showSuccess = true;
    this.showEditor = false;
  }

  initializeNewMovie(): Movie {
      return {
          adult: false,
          backdrop_path: '',
          genre_ids: [],
          id: Math.floor((Math.random() * 9999) + 2000),
          original_language: null,
          original_title: '',
          overview: '',
          popularity: null,
          poster_path: '',
          director: '',
          release_date: '',
          title: '',
          video: false,
          vote_average: null,
          vote_count: null
      }
  }

}
