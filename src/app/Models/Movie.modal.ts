
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: Float32Array;
  poster_path: string;
  director: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: Float32Array;
  vote_count: number;
}
