import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  private apikey: string = "40b3d9b695e368dae2235c6243083d68";
  private urlMoviedb: string = "https://api.themoviedb.org/3";

  constructor(private http: HttpClient) { }


  getQuery(query: string) {
    const url = `https://api.themoviedb.org/3${query}&api_key=${
      this.apikey
      }&language=en&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, "");
  }

  getQueryforPelicula(query: string) {
    const url = `https://api.themoviedb.org/3${query}?api_key=${
      this.apikey
      }&language=en&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, "");
  }

  getDiscoverMovies() {
    return this.getQuery("/discover/movie?sort_by=popularity.desc").pipe(
      map((data: any) => data.results)
    );
  }

  getBusquedaPeliculas(termino: string) {
    return this.getQuery(
      `/search/movie?query=${termino}&sort_by=popularity.desc`
    ).pipe(map((data: any) => data.results));
  }

  getPelicula(id: string) {
    return this.getQueryforPelicula(`/movie/${id}`).pipe(
      map((data: any) => data)
    );
  }

  getReviewforMovie(id: string) {
    return this.getQueryforPelicula(`/movie/${id}/reviews`).pipe(
      map((data: any) => data)
    );
  }







}
