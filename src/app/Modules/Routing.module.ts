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
	{ path: '', redirectTo: 'Cinema', pathMatch: 'full' },
    { path: 'Cinema', component: Cinema,
      children: [
		{ path: '', redirectTo: 'Home', pathMatch: 'full' },
		{ path: 'Login', component: Entrance, },
        { path: 'Home', component: Home, canActivate: [ AuthGuard ] },
		{ path: 'MovieSummary', component: MovieSummary, canActivate: [ AuthGuard ] },
		{ path: 'User-Details', component: UserDetails },
      ]
    },

   { path: '**', component: NotFound }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
