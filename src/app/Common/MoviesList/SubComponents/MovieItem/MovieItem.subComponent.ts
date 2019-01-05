
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../../Models/Movie.model';

@Component({
  selector: 'movie-item',
  templateUrl: './MovieItem.subComponent.html',
  styleUrls: ['./MovieItem.subComponent.scss']
})

export class MovieItem {
  @Input() movie: Movie;

  @Output() onRemove: EventEmitter<number> = new EventEmitter();
  @Output() onEdit: EventEmitter<number> = new EventEmitter();

  parentIsHovered: boolean;

}
