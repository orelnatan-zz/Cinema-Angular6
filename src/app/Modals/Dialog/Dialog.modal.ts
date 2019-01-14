import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Modal } from '../../Core/Modal';
import { Alert } from '../../Models/Alert.model';

@Component({
  selector: 'dialog',
  templateUrl: './Dialog.modal.html',
  styleUrls: ['./Dialog.modal.scss']
})

export class Dialog {
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onApprove: EventEmitter<any> = new EventEmitter();
  @Input() message: string;

}
