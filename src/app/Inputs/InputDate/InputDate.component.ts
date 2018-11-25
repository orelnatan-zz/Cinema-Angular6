import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'input-date',
  templateUrl: './InputDate.component.html',
  styleUrls: ['./InputDate.component.scss', '../inputs.styles.scss']
})

export class InputDate implements OnInit {
  @Input() title: string;
  @Input() value: string;
  @Input() min: string;
  @Input() max: string;
  @Input() validation: string;
  @Input() submitted: boolean;
  @Input() invalid: boolean;
  @Input() showTitle: boolean = true;
  @Input() showValidation: boolean = true;

  @Output() onChange: EventEmitter <any> = new EventEmitter();

  ngOnInit(){
      if(!this.max) this.max = this.convertToCalenderFormat(this.getCurrentDate());
  }

  getCurrentDate(): number {
    return new Date().getTime();
  }

  convertToCalenderFormat(date: number): string {
    return moment(date).format('YYYY-MM-DD');
  }

}
