import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../Store/AppState.model';
import { AuthSelectors } from '../../Store';
import { Router } from '@angular/router';
import { User } from '../../Models/User.model';

@Component({
  selector: 'header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})

export class Header implements OnInit {
	@Output() onEdit: EventEmitter<void> = new EventEmitter();
	@Output() onLogout: EventEmitter<void> = new EventEmitter();

	user$: Observable<User>;
	username: String;

	constructor(
		private store$: Store<AppState>, 
		private router: Router
	){
		this.user$ = this.store$.select (
			AuthSelectors.getLoggedUser
		);
	}

	ngOnInit() {
		this.user$.subscribe((user: User) => {
			this.username = user.username;
		})
	}

}