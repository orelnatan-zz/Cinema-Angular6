import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, } from '@angular/http';             
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './Routing.module';

import { AppRoot } from '../Core/AppRoot';

@NgModule({
  declarations: [
    AppRoot
  ],

  imports: [
    BrowserModule, 
    HttpModule, 
    JsonpModule, 
    ReactiveFormsModule, 
    FormsModule,
    RoutingModule,

  ],

  providers: [

  ],
  
  bootstrap: [ 
    AppRoot 
  ]
})
export class AppModule {

}
