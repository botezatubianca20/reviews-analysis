import { Component, OnInit } from '@angular/core';
import { MoviedbService } from "../../services/moviedb.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  pelicula: any = {};
  loadingPelicula: boolean;


  constructor(private router: ActivatedRoute,
    private moviedb: MoviedbService) { }

  ngOnInit() {

    this.loadingPelicula = true;

    this.router.params.subscribe(params => {
      console.log(params);

      this.moviedb.getPelicula(params['id'])
        .subscribe(pelicula => {
          console.log(pelicula);
          this.pelicula = pelicula;
          this.loadingPelicula = false;
        })

        this.moviedb.getReviewforMovie(params['id'])
        .subscribe(x => {
          console.log(x);
          // this.pelicula = pelicula;
          // this.loadingPelicula = false;
        })
    })

   


    
  }

}
