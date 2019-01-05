import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorage } from './LocalStorage.service';

const ENTRANCE_PATH: string = '/Login';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
	  public localStorage: LocalStorage, 
	  public router: Router) {}

  canActivate(): boolean {
	   if(!this.localStorage.isAuthenticated()) {
		   this.router.navigate([ENTRANCE_PATH]);
		   return false;
	   }

	   return true;
  }
}