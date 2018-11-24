import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cinema } from '../Pages/Cinema';

const routes: Routes = [
    { path: '', component: Cinema },
    { path: 'Cinema', component: Cinema },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class RoutingModule {

}