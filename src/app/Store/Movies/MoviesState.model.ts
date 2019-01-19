import { Movie } from "../../Models/Movie.model";
import { Alert } from "../../Models/Alert.model";

export interface MoviesState {
	movies: Array<Movie>,
	trash: Array<number>,
	displayMode: string,
    inProgress: boolean,
	failure: Alert,
	dialog: Alert,
	success: Alert
}
