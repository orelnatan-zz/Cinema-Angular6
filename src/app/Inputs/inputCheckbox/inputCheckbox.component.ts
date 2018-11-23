import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'input-checkbox',
  templateUrl: './inputCheckbox.component.html',
  styleUrls: ['./inputCheckbox.component.scss', '../inputs.styles.scss'],
})

export class InputCheckbox {

    @Input() id: string;
    @Input() title: string;
    @Input() validation: string;
    @Input() checked: boolean;
    @Input() submitted: boolean;
    @Input() invalid: boolean;
    @Input() showTitle: boolean = true;
    @Input() showValidation: boolean = true;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

}
