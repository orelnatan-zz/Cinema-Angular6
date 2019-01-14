import { User } from "../../Models/User.model";
import { Alert } from "../../Models/Alert.model";

export interface AuthState {
    logged: boolean,
    user: User,
    inProgress: boolean,
    failure: Alert,
    dialog: Alert
}
