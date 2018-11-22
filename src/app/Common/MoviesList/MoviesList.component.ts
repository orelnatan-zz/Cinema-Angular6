import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../Models/Movie.modal';

@Component({
  selector: 'movies-list',
  templateUrl: './MoviesList.component.html',
  styleUrls: ['./MoviesList.component.scss']
})

export class MoviesList {

  @Input() movies: Array<Movie>;

  @Output() onRemove = new EventEmitter();

}
