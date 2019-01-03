import { Component, Output, EventEmitter } from '@angular/core';
import { LoginAuth } from '../../Models/LoginAuth.model';

@Component({
  selector: 'login',
  templateUrl: './Login.form.html',
  styleUrls: ['./Login.form.scss']
})

export class Login {
  @Output() onSubmit: EventEmitter<LoginAuth>  = new EventEmitter();

  login: LoginAuth = {} as LoginAuth;


}

