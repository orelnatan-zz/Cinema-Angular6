import { Status } from "../../Models/Status.model";
import { Movie } from "../../Models/Movie.model";

export interface MoviesState {
    movies: Array<Movie>;
    isPending: boolean,
    status: Status
}
