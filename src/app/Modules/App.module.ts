import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './Routing.module';
import { MomentModule } from 'angular2-moment'; // npm i angular2-moment // https://www.npmjs.com/package/angular2-moment

import { AppRoot } from '../Core/AppRoot';
import { Modal } from '../Core/Modal';

import { Cinema } from '../Pages/Cinema';

import { MoviesList } from '../Common/MoviesList';
import { MovieItem } from '../Common/MoviesList/SubComponents/MovieItem';
import { Header } from '../Common/Header';
import { Spinner } from '../Common/Spinner';

import { Editor } from '../Modals/Editor';
import { Loader } from '../Modals/Loader';
import { Dialog } from '../Modals/Dialog';

@NgModule({
  declarations: [
    AppRoot,
    Modal,
    Cinema,
    MoviesList,
    MovieItem,
    Header,
    Spinner,
    Editor,
    Loader,
    Dialog,
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
