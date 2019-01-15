import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'success',
  templateUrl: './Success.modal.html',
  styleUrls: ['./Success.modal.scss']
})

export class Success {
    @Input() message: string;
    @Output() onClose: EventEmitter<void> = new EventEmitter();

}
