import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../Models/Movie.model';

@Component({
  selector: 'movies-list',
  templateUrl: './MoviesList.component.html',
  styleUrls: ['./MoviesList.component.scss']
})

export class MoviesList {
  @Input() movies: Array<Movie>;

  @Output() onRemove: EventEmitter<number> = new EventEmitter();
  @Output() onEdit: EventEmitter<number> = new EventEmitter();

}
