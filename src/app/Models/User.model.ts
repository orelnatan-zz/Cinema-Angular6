import { Movie } from "./Movie.model";

export interface User {
  id: number,
  username: string,
  password: string,
  mail: string,
  favorites: Array<Movie>
}
