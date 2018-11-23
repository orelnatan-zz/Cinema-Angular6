
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../../Models/Movie.modal';

@Component({
  selector: 'movie-item',
  templateUrl: './MovieItem.subComponent.html',
  styleUrls: ['./MovieItem.subComponent.scss']
})

export class MovieItem implements OnInit {

  @Input() movie: Movie;

  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  parentIsHovered: boolean;

  constructor(){

  }

  ngOnInit(){
    console.log(this.movie.adult);
  }



}
