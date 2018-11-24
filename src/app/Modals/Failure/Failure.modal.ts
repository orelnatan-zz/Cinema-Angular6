import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'failure',
  templateUrl: './Failure.modal.html',
  styleUrls: ['./Failure.modal.scss']
})

export class Failure {

    @Output() onClose: EventEmitter<any> = new EventEmitter();
 
}
