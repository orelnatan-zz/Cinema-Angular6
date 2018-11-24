import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Movie } from '../../Models/Movie.modal';

@Component({
  selector: 'movie-editor',
  templateUrl: './MovieEditor.modal.html',
  styleUrls: ['./MovieEditor.modal.scss'],

})

export class MovieEditor {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  @Input() movie: Movie;

  languages: Array<string> = ['en', 'es', 'fr', 'de', 'ja', 'hi', 'he', 'ru'];

  handleSubmit(movie: Movie): void{
    this.onSave.emit(movie);
  }

}
