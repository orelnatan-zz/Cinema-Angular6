import { Actions, ActionTypes } from './Actions';
import { AuthState } from './AuthState.model';
import { User } from '../../Models/User.model';
import { Status } from '../../Models/Status.model';

const initialState: AuthState = {
    logged: false,
    user: {} as User,
    isPending: false,
    status: {} as Status,
}

export function AuthReducer(state = initialState, action: Actions): AuthState {
    switch(action.type) {
        case ActionTypes.LOGIN: {
            return {
                ... state,
                isPending: true,
            };
        };
        case ActionTypes.LOGOUT: {
            return {
                ... initialState,
            };
        };
        case ActionTypes.LOGIN_FAILED: {
            return {
                ... state,
                logged: false,
                isPending: false,
                status: action.payload.error
            };
        };
        case ActionTypes.LOGIN_SUCCESS: {
            return {
                user: action.payload.user,
                logged: true,
                isPending: false,
                status: action.payload.success
            }
		}
		default: {
            return {
				... state
			}
        };
    }
}

