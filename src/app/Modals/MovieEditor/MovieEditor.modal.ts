import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Movie } from '../../Models/Movie.modal';
import { Language } from '../../Models/Language.modal';

@Component({
  selector: 'movie-editor',
  templateUrl: './MovieEditor.modal.html',
  styleUrls: ['./MovieEditor.modal.scss'],

})

export class MovieEditor implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @Input() movie: Movie = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: null,
    original_language: null,
    original_title: '',
    overview: '',
    popularity: null,
    poster_path: '',
    director: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: null,
    vote_count: null
  };

  languages = [
    {label: 'en', id: 1},
    {label: 'es', id: 2},
    {label: 'fr', id: 3},
    {label: 'de', id: 4},
    {label: 'ja', id: 5},
    {label: 'hi', id: 6},
    {label: 'he', id: 7},
  ]

  constructor(){

  }

  ngOnInit(){
    console.log(this.movie)
  }


  handleSubmit(movie: Movie){
    console.log(movie);
  }

}
