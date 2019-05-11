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
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import {FacebookLoginProvider, GoogleLoginProvider, AuthServiceConfig, SocialLoginModule} from 'ng4-social-login';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1050608807819-l6gpbfa8dobfmf4ddiutbu28a795s47a.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('380909745850905')
  }
], false);
 
export function provideConfig(){
  return config;
}

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
    ReviewsComponent,
    RecommendationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SocialLoginModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
    {provide: AuthServiceConfig, useFactory: provideConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
