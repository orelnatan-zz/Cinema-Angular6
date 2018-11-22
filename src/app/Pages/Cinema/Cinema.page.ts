import { Component } from '@angular/core';
import { Movies } from '../../Services/Movies.service';
import { Movie } from '../../Models/Movie.modal';
import * as moment from 'moment';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
  providers: [ Movies, ]
})

export class Cinema {

  movies: Array<Movie>;

  constructor(private Movies: Movies){
    this.Movies.getMovies().subscribe((response: any) => {
      this.movies = response.results;
      console.log(this.movies);
    })
  }

}
