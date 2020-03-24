import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MoviesDashboardComponent } from "./movies-dashboard.component";
import { StoreModule } from "@ngrx/store";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { Movie } from "../store/models/movie";

class StoreMock {
  select = jasmine.createSpy().and.returnValue(
    of([
      {
        movieName: "Saw 1",
        movieId: 1,
        movieRating: 0
      },
      {
        movieName: "The Mask",
        movieId: 2,
        movieRating: 0
      },
      {
        movieName: "Trapped",
        movieId: 3,
        movieRating: 0
      },
      {
        movieName: "Daredevil",
        movieId: 4,
        movieRating: 0
      },
      {
        movieName: "Spiderman",
        movieId: 5,
        movieRating: 0
      },
      {
        movieName: "Batman Begins",
        movieId: 6,
        movieRating: 0
      },
      {
        movieName: "The Joker",
        movieId: 7,
        movieRating: 0
      },
      {
        movieName: "Harry Potter",
        movieId: 8,
        movieRating: 0
      },
      {
        movieName: "Cyborg",
        movieId: 9,
        movieRating: 0
      },
      {
        movieName: "Doctor Strange",
        movieId: 10,
        movieRating: 0
      }
    ])
  );
  dispatch = jasmine.createSpy();
}
describe("MoviesDashboardComponent", () => {
  let component: MoviesDashboardComponent;
  let fixture: ComponentFixture<MoviesDashboardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesDashboardComponent],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        }
      ],
      imports: [StoreModule.forRoot({})]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDashboardComponent);
    component = fixture.componentInstance;
    jasmine.clock().install();
    fixture.detectChanges();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to set the rating of the currently selected movie and dispatch a new
   rate movie action when onRandomRating function is invoked`, () => {
    component.movies = [
      {
        movieId: 1,
        movieName: "saw 1",
        movieRating: 0
      }
    ];
    let rating = 6;
    let clickedMovie = {
      movieId: 1,
      movieName: "saw 1",
      movieRating: 0
    };
    const sortMovies = spyOn(component, "sortMovies");
    component.onRateChange(rating, clickedMovie);
    expect(sortMovies).toHaveBeenCalledWith([
      {
        movieId: 1,
        movieName: "saw 1",
        movieRating: 6
      }
    ]);
  });

  it(`should expect to call sortMoviesRandomly function when randomCount counter
   is an odd number and when onRandomRating is invoked`, () => {
    //randomCount variable was not set to 1 because each time onRandomRating is invoked it is by default set to 1 (Odd Number)
    const sortMoviesRandomly = spyOn(component, "sortMoviesRandomly");
    component.onRandomRating();
    expect(sortMoviesRandomly).toHaveBeenCalled();
  });

  it(`should expect to call stopRandomMoviesSorting function when randomCount counter 
  is an even number and when onRandomRating is invoked`, () => {
    //randomCount variable was set to 1 because when onRandomRating is invoked the value of randomCount will be 2 (Even Number)
    component.randomCount = 1;
    const stopRandomMoviesSorting = spyOn(component, "stopRandomMoviesSorting");
    component.onRandomRating();
    expect(stopRandomMoviesSorting).toHaveBeenCalled();
  });

  it("should expect to stop random sorting and clear randomSortingId when stopRandomMoviesSorting function is invoked ", () => {
    component.stopRandomMoviesSorting();
    expect(component.randomSortingId).toBeNull();
  });

  it(`should expect to set randomSortingId,dispatch a new rate movie action, set movies objects with random ratings
    and call sortMovies function when ortMoviesRandomly is invoked`, () => {
    let timerCallback = jasmine.createSpy("setInterval");
    setTimeout(function() {
      timerCallback();
    }, 1000);
    const sortMovies = spyOn(component, "sortMovies");
    component.sortMoviesRandomly();
    jasmine.clock().tick(1001);
    expect(sortMovies).toHaveBeenCalled();
  });

  it("should expect to sort movies descendingly according to their rating when sortMovies function is invoked", () => {
    let unsortedMovies = [
      {
        movieId: 1,
        movieName: "saw 1",
        movieRating: 1
      },
      {
        movieId: 1,
        movieName: "saw 1",
        movieRating: 10
      }
    ];
    let sortedMovies = [
      {
        movieId: 1,
        movieName: "saw 1",
        movieRating: 10
      },
      {
        movieId: 1,
        movieName: "saw 1",
        movieRating: 1
      }
    ];
    component.sortMovies(unsortedMovies);
    expect(component.sortedMovies).toEqual(sortedMovies);
  });
});
