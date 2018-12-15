import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})

export class Header {
  @Output() edit: EventEmitter<any> = new EventEmitter();

}