import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cinema } from '../Pages/Cinema';
import { MovieSummary } from '../Pages/MovieSummary';
import { Home } from '../Pages/Home';

const routes: Routes = [                                                    // empty = (empty from component's point of view!)
    { path: '', redirectTo: 'Cinema', pathMatch: 'full' },                  // if path = empty(http://localhost:5000), so redirectTo http://localhost:5000/Cinema.
    { path: 'Cinema', component: Cinema, 
      children: [
        { path: '', redirectTo: 'Home', pathMatch: 'full' },                // if path = empty(http://localhost:5000/Cinema), so redirectTo http://localhost:5000/Cinema/Home.
        { path: 'Home', component: Home },
        { path: 'MovieSummary', component: MovieSummary },
      ]
    },

  //  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class RoutingModule {

}