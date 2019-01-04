import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './AuthState.model';
import { User } from '../../Models/User.model';
import { Status } from '../../Models/Status.model';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getLoggedUser = createSelector(
    getAuthState,
    (state: AuthState): User => {
        return state.user;
    }
);

export const getAuthIsPending = createSelector(
    getAuthState,
    (state: AuthState): boolean => {
        return state.isPending;
    }
);

export const getLoginStatus = createSelector(
    getAuthState,
	(state: AuthState): Status => {
		return state.status;
    }
);

export const getIsLogged = createSelector(
    getAuthState,
	(state: AuthState): boolean => {
		return state.logged;
    }
);
