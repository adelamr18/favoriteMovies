import { Action } from "@ngrx/store";
import { Movie } from "../models/movie";

export enum MoviesActionTypes {
  RATE_MOVIE = "[MOVIES] Rate Movie"
}

export class RateMovieAction implements Action {
  readonly type = MoviesActionTypes.RATE_MOVIE;

  constructor(public payload: Movie) {}
}

export type MovieAction = RateMovieAction;
