import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Library } from '../Pages/Library';

const routes: Routes = [
    { path: '', component: Library },
    { path: 'Library', component: Library },
];

@NgModule({

  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})


export class RoutingModule {

    constructor(){


    }

}