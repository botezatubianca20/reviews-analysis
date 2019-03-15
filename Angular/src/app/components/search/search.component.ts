import { Component, OnInit } from '@angular/core';
import { MoviedbService } from "../../services/moviedb.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies: any[] = [];
  loading: boolean;

  constructor(private moviedb: MoviedbService) { }

  ngOnInit() {
  }

  search(item: string) {
    console.log(item);

    this.loading = true;
    this.moviedb.getSearchMovie(item).subscribe((data: any) => {
      console.log(data);

      this.movies = data;
      this.loading = false;
    });
  }

}
