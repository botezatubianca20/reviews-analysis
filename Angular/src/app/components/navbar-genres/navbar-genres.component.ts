import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-navbar-genres',
  templateUrl: './navbar-genres.component.html',
  styleUrls: ['./navbar-genres.component.css']
})
export class NavbarGenresComponent implements OnInit {
  genresArray: any = [];

  @Output() chooseIdGenre: EventEmitter<number> = new EventEmitter();
  constructor(private moviedb: MoviedbService) { }

  ngOnInit() {
    this.moviedb.getGenres().subscribe((data: any) => {
      console.log(data);
      this.genresArray = data.genres;
      console.log(this.genresArray)
    })

  }

  onClick() {
    this.chooseIdGenre.emit(16);
  }


}
