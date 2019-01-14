import { Movie } from "../../Models/Movie.model";

export interface MoviesState {
    movies: Array<Movie>;
    inProgress: boolean,
    failure: boolean
}
