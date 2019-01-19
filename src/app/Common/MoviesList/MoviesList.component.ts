import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../Models/Movie.model';

@Component({
  selector: 'movies-list',
  templateUrl: './MoviesList.component.html',
  styleUrls: ['./MoviesList.component.scss']
})

export class MoviesList {
  @Input() movies: Array<Movie>;

  @Output() remove: EventEmitter<number> = new EventEmitter();
  @Output() edit: EventEmitter<number> = new EventEmitter();
  @Output() stared: EventEmitter<Movie> = new EventEmitter();
}
