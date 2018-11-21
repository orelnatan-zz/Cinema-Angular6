import { Component, Input } from '@angular/core';
import { Movie } from '../../Models/Movie.modal';

@Component({
  selector: 'movies-list',
  templateUrl: './MoviesList.component.html',
  styleUrls: ['./MoviesList.component.scss']
})

export class MoviesList {

  @Input() movies: Array<Movie>;

}
