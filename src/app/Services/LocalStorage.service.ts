import { Injectable, }  from '@angular/core';
import { User } from '../Models/User.model';
import { Object } from 'core-js';

export interface Cinema {
	user: User,
}

@Injectable()
export class LocalStorage {

    constructor(){}

	private getLocalData(): Cinema {
		const localData: Cinema = {
			user: {} as User,
		}

		if(typeof(Storage) !== "undefined"){
		  if(localStorage.getItem("Cinima") != null) {
				try{
					return JSON.parse(localStorage.getItem("Cinima"));
				} catch(exp){}
		    }      
			return localData;		 
	   }
       return localData;				
    }

	public setUser(user: User): void {
		const cinema: Cinema = {
			user: user,
		}
		this.updateLocalData(cinema);
	}
	
	public getAuthenticatedUser(): User {
		return 'user' in this.getLocalData() ? this.getLocalData().user : {} as User;
	}

	public isAuthenticated(): boolean {
		return Object.keys(this.getAuthenticatedUser()).length > 0;
	}

	public removeUser(): void {
		const cinema: Cinema = this.getLocalData();

		delete cinema['user'];
		this.updateLocalData(cinema);
	}

	private updateLocalData(cinema: Cinema): void {
        localStorage.removeItem("Cinima");
        localStorage.setItem("Cinima", JSON.stringify(cinema));
    }
}

