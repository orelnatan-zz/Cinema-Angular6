import { User } from "../../Models/User.model";
import { Error } from "../../Models/Error.model";

export interface AuthState {
    logged: boolean,
    user: User,
    isPending: boolean,
    error: Error
}
