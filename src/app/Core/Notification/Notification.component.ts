import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './Notification.component.html',
  styleUrls: ['./Notification.component.scss']
})

export class Notification {
    
 @Input() notification: string;
 @Input() iconClass: string;
 @Input() alertColor: string;

 @Output() onClose: EventEmitter<any> = new EventEmitter();
 
}

  