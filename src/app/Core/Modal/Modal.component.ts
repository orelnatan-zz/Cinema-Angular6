
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './Modal.component.html',
  styleUrls: ['./Modal.component.scss']
})

export class Modal {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() showCloseButton: boolean = true;

  modalIsOpen: boolean = true;

  closeModal(){
    this.modalIsOpen = false;
    setTimeout(() => {
      this.onClose.emit();
    }, 300);
  }
  
}

