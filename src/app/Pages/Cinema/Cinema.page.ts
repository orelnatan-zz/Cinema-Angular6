import { Component, ViewChild, OnInit } from '@angular/core';
import { Movies } from '../../Services/Movies.service';
import { Movie } from '../../Models/Movie.modal';

//import * as moment from 'moment';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
  providers: [ Movies, ]
})

export class Cinema implements OnInit {
  showLoader: boolean;
  showDialog: boolean;
  showSuccess: boolean;
  showEditor: boolean;

  movies: Array<Movie>;
  movieId: number;
  movie: Movie;

  constructor(private Movies: Movies){

  }

  ngOnInit(){
    this.showLoader = true;

    this.Movies.getMovies().subscribe((response: any) => {
      this.movies = response;
      this.showLoader = false;
      console.log(this.movies);
    })
  }

  handleRemove(id: number){
    this.movieId = id;
    this.showDialog = true;
  }

  handleEdit(id: number){
    this.movie = {...this.movies.find(movie => movie.id == id)};      //Copy book by value only...
    this.showEditor = true;
  }

  deleteMovie(id: number){
    let index = this.movies.findIndex(movie => movie.id == id);
    this.movies.splice(index, 1);

    this.showDialog = false;
    this.showSuccess = true;
  }

  

}
