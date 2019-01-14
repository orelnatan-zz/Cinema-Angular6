import { Actions, ActionTypes } from './Actions';
import { AuthState } from './AuthState.model';
import { User } from '../../Models/User.model';
import { Alert } from '../../Models/Alert.model';

const initialState: AuthState = {
    logged: false,
    user: {} as User,
    inProgress: false,
    failure: { isShown: false } as Alert,
    dialog: { isShown: false } as Alert,
}

export function AuthReducer(state = initialState, action: Actions): AuthState {
    switch(action.type) {
        case ActionTypes.LOGIN: {
            return {
                ... state,
                inProgress: true,
            };
        };
        case ActionTypes.LOGOUT: {
            return {
                ... initialState,
            };
        };
        case ActionTypes.AUTH_DIALOG: {
            return {
                ... state,
                dialog: action.payload.dialog,
            };
        };
        case ActionTypes.LOGIN_FAILURE: {
            return {
                ... state,
                logged: false,
                inProgress: false,
                failure: action.payload.failure
            };
        };
        case ActionTypes.LOGIN_SUCCESS: {
            return {
                ... state,
                user: action.payload.user,
                logged: true,
                inProgress: false,
                failure: action.payload.failure,
            }
		}
		default: {
            return {
				... state
			}
        };
    }
}

