import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './Routing.module';
import { MomentModule } from 'angular2-moment'; // npm i angular2-moment // https://www.npmjs.com/package/angular2-moment

import { DateAdapter } from '../Pips/DateAdapter';
import { Purifier } from '../Pips/Purifier';

import { AppRoot } from '../Core/AppRoot';
import { Modal } from '../Core/Modal';
import { Notification } from '../Core/Notification';
import { Header } from '../Core/Header';

import { Cinema } from '../Pages/Cinema';

import { MoviesList } from '../Common/MoviesList';
import { MovieItem } from '../Common/MoviesList/SubComponents/MovieItem';
import { Spinner } from '../Common/Spinner';

import { MovieEditor } from '../Modals/MovieEditor';
import { Loader } from '../Modals/Loader';
import { Dialog } from '../Modals/Dialog';
import { Success } from '../Modals/Success';
import { Failure } from '../Modals/Failure';

import { InputText } from '../Inputs/inputText';
import { InputSelect } from '../Inputs/InputSelect';
import { InputDate } from '../Inputs/InputDate';
import { InputCheckbox } from '../Inputs/InputCheckbox';

@NgModule({
  declarations: [
    AppRoot,
    Modal,
    Notification,
    Cinema,
    MoviesList,
    MovieItem,
    Header,
    Spinner,
    MovieEditor,
    Loader,
    Dialog,
    Success,
    Failure,
    InputText,
    InputSelect,
    InputDate,
    InputCheckbox,
    DateAdapter,
    Purifier
  ],

  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    FormsModule,
    RoutingModule,
    MomentModule,

  ],

  providers: [
    
  ],

  bootstrap: [
    AppRoot
  ]
})
export class AppModule {

}
