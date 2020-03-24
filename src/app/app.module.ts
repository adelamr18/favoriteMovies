import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MoviesDashboardComponent } from "./movies-dashboard/movies-dashboard.component";
import { StoreModule } from "@ngrx/store";
import { MoviesReducer } from "./store/reducers/movies.reducer";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, MoviesDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    StoreModule.forRoot({
      movies: MoviesReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
