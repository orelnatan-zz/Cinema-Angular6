import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './AuthState.model';
import { User } from '../../Models/User.model';
import { Alert } from '../../Models/Alert.model';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getLoggedUser = createSelector(
    getAuthState,
    (state: AuthState): User => {
        return state.user;
    }
);

export const getAuthInProgress = createSelector(
    getAuthState,
    (state: AuthState): boolean => {
        return state.inProgress;
    }
);

export const getAuthDialog = createSelector(
  getAuthState,
  (state: AuthState): Alert => {
    return state.dialog;
  }
);

export const getAuthFailure = createSelector(
  getAuthState,
	(state: AuthState): Alert => {
		return state.failure;
    }
);

export const getIsAuthenticated = createSelector(
    getAuthState,
	  (state: AuthState): boolean => {
		return state.logged;
    }
);


