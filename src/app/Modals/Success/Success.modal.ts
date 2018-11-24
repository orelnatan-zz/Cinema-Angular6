import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'success',
  templateUrl: './Success.modal.html',
  styleUrls: ['./Success.modal.scss']
})

export class Success {
    @Output() onClose: EventEmitter<any> = new EventEmitter();
 
}
