import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-navbar-genres',
  templateUrl: './navbar-genres.component.html',
  styleUrls: ['./navbar-genres.component.css']
})
export class NavbarGenresComponent implements OnInit {
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
