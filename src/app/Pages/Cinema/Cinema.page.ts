import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
import { Dispatcher } from '../../Services/Dispatcher.service';
import { Loader } from '../../Modals/Loader';
import { Success } from '../../Modals/Success';
import { Route } from '../../Models/Route.modal';
import { Failure } from '../../Modals/Failure';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
})

export class Cinema implements OnInit {
  @ViewChild('loaderRef') loaderRef: Loader;
  @ViewChild('successRef') successRef: Success;
  @ViewChild('failureRef') failureRef: Failure;
  
  constructor(private router: Router,
              private dispatcher: Dispatcher) {
    
      this.dispatcher.onRedirect().subscribe((route: Route) => {
          this.router.navigate([route.path], {
              queryParams: route.queryParams,
          })
      })

      this.dispatcher.onLoaderToggled().subscribe((isActive: boolean) => {
          isActive ? this.loaderRef.openModal() : this.loaderRef.closeModal();
      });

      this.dispatcher.onSuccessToggled().subscribe((isActive: boolean) => {
          isActive ? this.successRef.openModal() : this.successRef.closeModal();
      });
      
      this.dispatcher.onFailureToggled().subscribe((isActive: boolean) => {
        isActive ? this.failureRef.openModal() : this.failureRef.closeModal();
    });
  }

  showEditButton: boolean;

  ngOnInit() {
    this.loaderRef.openModal();
  }

  onActivate(routerActivated: ActivatedRoute){
    const activeComponent = routerActivated.constructor.name;
    this.showEditButton = activeComponent == "Home";
  }

}
