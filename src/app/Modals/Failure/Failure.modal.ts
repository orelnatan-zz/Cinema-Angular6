import { Component, Input, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'failure',
  templateUrl: './Failure.modal.html',
  styleUrls: ['./Failure.modal.scss']
})

export class Failure {
  @Input() message: string;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

}
