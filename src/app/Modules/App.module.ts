import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './Routing.module';
import { MomentModule } from 'angular2-moment'; // npm i angular2-moment // https://www.npmjs.com/package/angular2-moment
import { DynamicModule } from 'ng-dynamic-component'; // npm install ng-dynamic-component --save // https://www.npmjs.com/package/ng-dynamic-component

import { MovieDate } from '../Pips/MovieDate';
import { MovieTitle } from '../Pips/MovieTitle';

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
import { InputText } from '../Inputs/InputText';
import { InputSelect } from '../Inputs/InputSelect';
import { InputDate } from '../Inputs/InputDate';
import { InputCheckbox } from '../Inputs/InputCheckbox';
 
@NgModule({
  declarations: [
    AppRoot,
    Modal,
    Notification,
    Header,
    Cinema,
    MoviesList,
    MovieItem,
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
    MovieDate,
    MovieTitle
  ],

  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    FormsModule,
    RoutingModule,
    MomentModule,
    DynamicModule.withComponents([Success, Dialog, Failure, MovieEditor, Loader])  // All components that can be dynamically generated. 
  ],

  providers: [

  ],

  bootstrap: [
    AppRoot
  ]
})
export class AppModule {

}
