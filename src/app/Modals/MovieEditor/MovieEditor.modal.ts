import { Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Movie } from '../../Models/Movie.modal';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'movie-editor',
  templateUrl: './MovieEditor.modal.html',
  styleUrls: ['./MovieEditor.modal.scss'],

})

export class MovieEditor {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  @Input() movie: Movie;

  @ViewChild('modalRef') modalRef: Modal;

  closeModal(){
      this.modalRef.closeModal();
  }

  languages: Array<string> = ['en', 'es', 'fr', 'de', 'ja', 'hi', 'he', 'ru', 'sv', 'it', 'cn'];

}
