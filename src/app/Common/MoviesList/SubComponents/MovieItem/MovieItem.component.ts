
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../../Models/Movie.modal';

@Component({
  selector: 'movie-item',
  templateUrl: './MovieItem.component.html',
  styleUrls: ['./MovieItem.component.scss']
})

export class MovieItem implements OnInit {

  @Input() movie: Movie;

  constructor(){

  }

  ngOnInit(){
    console.log(this.movie);
  }

}
