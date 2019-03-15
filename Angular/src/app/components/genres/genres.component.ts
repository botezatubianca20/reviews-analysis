import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genresArray: any = [];

  constructor(private moviedb: MoviedbService) { }

  ngOnInit() {

    this.moviedb.getGenres().subscribe((data: any) => {
      console.log(data);
      this.genresArray = data.genres;
      console.log(this.genresArray)
    })
  }

}
