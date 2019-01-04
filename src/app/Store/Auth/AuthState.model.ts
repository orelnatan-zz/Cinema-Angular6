import { User } from "../../Models/User.model";
import { Status } from "../../Models/Status.model";

export interface AuthState {
    logged: boolean,
    user: User,
    isPending: boolean,
    status: Status
}
