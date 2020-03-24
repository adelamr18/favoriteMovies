import { Movie } from "./movie";

export interface AppState {
  readonly movies: Array<Movie>;
}
