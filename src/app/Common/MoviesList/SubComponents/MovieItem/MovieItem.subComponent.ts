
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../../Models/Movie.modal';

@Component({
  selector: 'movie-item',
  templateUrl: './MovieItem.subComponent.html',
  styleUrls: ['./MovieItem.subComponent.scss']
})

export class MovieItem implements OnInit {
  IMAGE_PREFIX: string = "https://image.tmdb.org/t/p/w500";

  @Input() movie: Movie;

  @Output() onRemove = new EventEmitter();

  parentIsHovered: boolean;

  constructor(){

  }

  ngOnInit(){
    console.log(this.movie.adult);
  }



}
