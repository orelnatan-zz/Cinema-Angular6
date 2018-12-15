import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Movie } from '../../Models/Movie.model';

@Component({
  selector: 'movie-editor',
  templateUrl: './MovieEditor.form.html',
  styleUrls: ['./MovieEditor.form.scss']
})

export class MovieEditor {
    @Output() onExit: EventEmitter<any> = new EventEmitter();
    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  
    @Input() movie: Movie;
  
    languages: Array<string> = ['en', 'es', 'fr', 'de', 'ja', 'hi', 'he', 'ru', 'sv', 'it', 'cn'];
}

