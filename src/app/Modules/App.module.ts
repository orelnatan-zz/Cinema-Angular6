import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from '../Modules/Routing.module';
import { AppStoreModule } from '../Store';
import { MomentModule } from 'angular2-moment'; 				// npm i angular2-moment // https://www.npmjs.com/package/angular2-moment
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 	// npm install @ngrx/store-devtools --save // https://alligator.io/angular/ngrx-store-redux-devtools/

import { Movies } from '../Services/Movies.service';
import { Users } from '../Services/Users.service';
import { LocalStorage } from '../Services/LocalStorage.service';
import { AuthGuard } from '../Services/AuthGuard.service';

import { MovieDate } from '../Pips/MovieDate';
import { MovieTitle } from '../Pips/MovieTitle';

import { AppRoot } from '../Core/AppRoot';
import { Modal } from '../Core/Modal';
import { Notification } from '../Core/Notification';
import { Header } from '../Core/Header';
import { Cinema } from '../Pages/Cinema';
import { UserDetails } from '../Pages/UserDetails';
import { Entrance } from '../Pages/Entrance';
import { MovieSummary } from '../Pages/MovieSummary';
import { NotFound } from '../Pages/NotFound';
import { Home } from '../Pages/Home';
import { MoviesList } from '../Common/MoviesList';
import { MovieItem } from '../Common/MoviesList/SubComponents/MovieItem';
import { Spinner } from '../Common/Spinner';
import { MovieEditor } from '../Forms/MovieEditor';
import { Login } from '../Forms/LogIn';
import { MovieViewer } from '../Modals/MovieViewer';
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
	Entrance,
	UserDetails,
    Home,
	MovieSummary,
	NotFound,
    MoviesList,
    MovieItem,
    Spinner,
    MovieEditor,
    Login,
    MovieViewer,
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
    AppStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })

  ],

  providers: [
	Movies,
	Users,
	LocalStorage,
	AuthGuard
  ],

  bootstrap: [
    AppRoot
  ]
})
export class AppModule {

}
