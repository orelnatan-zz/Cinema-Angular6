import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'loader',
  templateUrl: './Loader.modal.html',
  styleUrls: ['./Loader.modal.scss']
})

export class Loader {
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalRef') modalRef: Modal;

  closeModal(){
      this.modalRef.closeModal();
  }
}
