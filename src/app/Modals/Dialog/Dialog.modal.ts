import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'dialog',
  templateUrl: './Dialog.modal.html',
  styleUrls: ['./Dialog.modal.scss']
})

export class Dialog implements OnInit, OnDestroy {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onApprove: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log('dialog ngOnInit');
  }

  ngOnDestroy() {
    console.log('dialog ngOnDestroy');
  }

}
