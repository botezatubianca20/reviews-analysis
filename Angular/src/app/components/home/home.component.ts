import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newMovies: any[] = [];
  loading: boolean;

  constructor(private moviedb: MoviedbService) { }

  ngOnInit() {

    this.loading = true;

    this.moviedb.getDiscoverMovies()
      .subscribe((data: any) => {

        console.log(data);
        this.newMovies = data;
        this.loading = false;
      });

  




  }

}
