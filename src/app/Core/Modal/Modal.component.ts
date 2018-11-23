
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './Modal.component.html',
  styleUrls: ['./Modal.component.scss']
})

export class Modal {

  @Output() onClose: EventEmitter<any> = new EventEmitter();
}












// glass = 'https://www.grassvalley.com/home/img/empty_192x108.png';
