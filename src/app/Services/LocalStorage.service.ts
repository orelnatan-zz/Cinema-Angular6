import { Injectable, }  from '@angular/core';
import { Observable } from 'rxjs/Rx';   // npm install rxjs-compat
import { User } from '../Models/User.model';
import { Movie } from '../Models/Movie.model';

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

	public getAuthenticatedUser(): User {
		return 'user' in this.getLocalData() ? this.getLocalData().user : {} as User;
	}

	public isAuthenticated(): boolean {
		return Object.keys(this.getAuthenticatedUser()).length > 0;
	}

	public setUser(user: User): void {
		const cinema: Cinema = this.getLocalData();

		cinema.user = user;
		this.updateLocalData(cinema);
	}

	public removeUser(): void {
		const cinema: Cinema = this.getLocalData();

		delete cinema['user'];
		this.updateLocalData(cinema);
	}

	public addFavorite(movie: Movie): void {
		const cinema: Cinema = this.getLocalData();

		cinema.user.favorites.push(movie);
		this.updateLocalData(cinema);
	}

	public removeFavorite(favoriteId: number): void {
		const cinema: Cinema = this.getLocalData();

		cinema.user.favorites.splice(cinema.user.favorites
							.findIndex((movie: Movie) => {
								return movie.id == favoriteId;
							}), 1);
		this.updateLocalData(cinema);
	}

	public getUserFavorites(): Observable<Movie[] | Error> {
		return new Observable((observer) => {
            observer.next(
				this.getAuthenticatedUser().favorites
			);
			observer.complete();
		});
	}

	private updateLocalData(cinema: Cinema): void {
        localStorage.removeItem("Cinima");
        localStorage.setItem("Cinima", JSON.stringify(cinema));
    }
}

