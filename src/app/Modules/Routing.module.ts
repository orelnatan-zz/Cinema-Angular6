import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cinema } from '../Pages/Cinema';

const routes: Routes = [
    { path: '', redirectTo: '/Cinema', pathMatch: 'full' },
    { path: 'Cinema', component: Cinema },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class RoutingModule {

}