import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Services/AuthGuard.service';
import { Cinema } from '../Pages/Cinema';
import { UserDetails } from '../Pages/UserDetails';
import { Entrance } from '../Pages/Entrance';
import { MovieSummary } from '../Pages/MovieSummary';
import { Home } from '../Pages/Home';
import { NotFound } from '../Pages/NotFound';

const routes: Routes = [                                                  
	{ path: 'User-Details', component: UserDetails },
	{ path: 'Entrance', component: Entrance, },
	{ path: '', redirectTo: 'Cinema', pathMatch: 'full' },                  
    { path: 'Cinema', component: Cinema, canActivate: [ AuthGuard ], 
      children: [
        { path: '', redirectTo: 'Home', pathMatch: 'full' },           
        { path: 'Home', component: Home },
        { path: 'MovieSummary', component: MovieSummary },
      ]
    },

   { path: '**', component: NotFound }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class RoutingModule {}