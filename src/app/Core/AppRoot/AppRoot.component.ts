import { Component } from '@angular/core';
import { Dispatcher } from '../../Services/Dispatcher.service';
import { Route } from '../../Models/Route.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './AppRoot.component.html',
  styleUrls: ['./AppRoot.component.scss']
})
// This is the top level component //
export class AppRoot {

  constructor(private dispatcher: Dispatcher, private router: Router){
      
      this.dispatcher.onRedirect().subscribe((route: Route) => {
        console.log('app root onRedirect');
          this.router.navigate([route.path], {
              queryParams: route.queryParams,
          })
      })
  }

}

