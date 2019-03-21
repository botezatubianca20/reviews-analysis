import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SearchComponent } from './components/search/search.component';
import { GenresComponent } from './components/genres/genres.component';
import { GenreMovieComponent } from './components/genre-movie/genre-movie.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "search", component: SearchComponent },
  { path: "genres", component: GenresComponent },
  { path: 'genres/:id', component: GenreMovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
