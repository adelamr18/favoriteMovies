import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/models/app-state.model";
import { Observable } from "rxjs";
import { Movie } from "../store/models/movie";
import { RateMovieAction } from "../store/actions/movie.actions";

@Component({
  selector: "app-movies-dashboard",
  templateUrl: "./movies-dashboard.component.html",
  styleUrls: ["./movies-dashboard.component.scss"]
})
export class MoviesDashboardComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  movies$: Observable<Array<Movie>>;
  movies: Array<Movie>;
  randomCount: number = 0;
  randomSortingId: any = null;
  sortedMovies: Array<Movie>;
  ngOnInit(): void {
    this.getMovies();
  }

  onRateChange = (rating: number, clickedMovie: Movie) => {
    let moviesCopy = JSON.parse(JSON.stringify([...this.movies]));
    let ratedMovie = moviesCopy.find(
      movie => movie.movieId === clickedMovie.movieId
    );
    ratedMovie["movieRating"] = rating;
    this.sortMovies(moviesCopy);
    this.store.dispatch(new RateMovieAction(moviesCopy));
  };

  onRandomRating = () => {
    this.randomCount++;
    this.randomCount % 2 === 1
      ? this.sortMoviesRandomly()
      : this.stopRandomMoviesSorting();
  };

  sortMoviesRandomly = () => {
    this.randomSortingId = setInterval(() => {
      let moviesCopy = JSON.parse(JSON.stringify([...this.movies]));
      let result = moviesCopy.map(o =>
        Object.assign(o, { movieRating: Math.floor(Math.random() * 10) })
      );
      this.sortMovies(result);
      this.store.dispatch(new RateMovieAction(result));
    }, 1000);
  };

  stopRandomMoviesSorting = () => {
    clearInterval(this.randomSortingId);
    this.randomSortingId = null;
  };

  sortMovies = arr => {
    this.sortedMovies = arr.sort(
      (a: Movie, b: Movie) => b.movieRating - a.movieRating
    );
  };

  getMovies = () => {
    this.movies$ = this.store.select(store => store.movies);
    this.movies$.subscribe(res => {
      this.movies = res["default"]
        ? JSON.parse(JSON.stringify(res["default"]))
        : JSON.parse(JSON.stringify(res));
    });
  };
}
