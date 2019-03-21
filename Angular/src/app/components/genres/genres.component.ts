import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  moviesByGenreArray: any[] = [];
  chooseIdGenre: number = 16;

  constructor(private moviedb: MoviedbService) { }

  ngOnInit() {
    this.moviedb.getDiscoverMoviesByGenre(this.chooseIdGenre).subscribe((data: any) => {
      console.log(data);
      this.moviesByGenreArray = data;
      console.log(this.moviesByGenreArray);
    })
  }



}
