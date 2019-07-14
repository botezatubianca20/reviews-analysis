import { Component, OnInit, Input } from '@angular/core';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  moviesByGenreArray: any[] = [];
  // chooseIdGenre: number = 16;

  choose: number;
  constructor(private moviedb: MoviedbService) { }

  ngOnInit() {
  }

  childSays($event) {
    this.choose = $event;
    console.log(this.choose);
    this.moviedb.getDiscoverMoviesByGenre(this.choose).subscribe((data: any) => {
      // console.log(data);
      this.moviesByGenreArray = data;
      // console.log(this.moviesByGenreArray);
    })
  }


  



}
