
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../../Models/Movie.model';

@Component({
  selector: 'movie-item',
  templateUrl: './MovieItem.subComponent.html',
  styleUrls: ['./MovieItem.subComponent.scss']
})

export class MovieItem {
  @Input() movie: Movie;

  @Output() remove: EventEmitter<number> = new EventEmitter();
  @Output() edit: EventEmitter<number> = new EventEmitter();
  @Output() stared: EventEmitter<Movie> = new EventEmitter();

  parentIsHovered: boolean;
}
