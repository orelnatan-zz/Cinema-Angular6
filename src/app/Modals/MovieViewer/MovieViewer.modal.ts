import { Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Movie } from '../../Models/Movie.modal';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'movie-viewer',
  templateUrl: './MovieViewer.modal.html',
  styleUrls: ['./MovieViewer.modal.scss'],

})

export class MovieViewer {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  @Input() movie: Movie;

  @ViewChild('modalRef') modalRef: Modal;

  closeModal(){
      this.modalRef.closeModal();
  }

}
