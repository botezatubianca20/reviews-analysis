import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { MovieComponent } from './components/movie/movie.component';
import { CardComponent } from './components/card/card.component';
import { MovieImagePipe } from './pipes/image.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GenresComponent } from './components/genres/genres.component';
import { NavbarGenresComponent } from './components/navbar-genres/navbar-genres.component';
import { GenreMovieComponent } from './components/genre-movie/genre-movie.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieComponent,
    CardComponent,
    MovieImagePipe,
    NavbarComponent,
    GenresComponent,
    NavbarGenresComponent,
    GenreMovieComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule 
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
