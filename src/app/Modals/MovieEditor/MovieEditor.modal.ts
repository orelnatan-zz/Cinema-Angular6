import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Movie } from '../../Models/Movie.modal';

@Component({
  selector: 'movie-editor',
  templateUrl: './MovieEditor.modal.html',
  styleUrls: ['./MovieEditor.modal.scss'],

})

export class MovieEditor implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();

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

  languages = ['en', 'es', 'fr', 'de', 'ja', 'hi', 'he', 'ru'];
   

  constructor(){

  }

  ngOnInit(){
    console.log(this.movie)
  }

  handleSubmit(movie: Movie){
    this.onSave.emit(movie);
  }

}
