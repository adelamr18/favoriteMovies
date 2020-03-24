import { Movie } from "../models/movie";
import * as moviesData from "../../../assets/data/data.json";
import { MovieAction, MoviesActionTypes } from "../actions/movie.actions";
const initialState: Array<Movie> = moviesData;

export function MoviesReducer(state = initialState, action: MovieAction) {
  switch (action.type) {
    case MoviesActionTypes.RATE_MOVIE:
      return action.payload;
    default:
      return state;
  }
}
