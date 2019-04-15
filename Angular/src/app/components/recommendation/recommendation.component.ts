import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  loading: boolean = true;
  movie: any ={};
  recommended: string;
  recommendedMoviesArray: any = [];
  sorry: boolean = false;

  
  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
  }

  ngOnChange(){
    this.loading  = true;
  }


  onKeydown(event, item: any) {
    if (event.key === "Enter") {
      // console.log(event);
      // console.log(item)
      this.movie = {movie: item};

      this.reviewsService.postMovieForRecommendation(this.movie).toPromise().then(res => {
        console.log(this.movie)
        console.log(res)

        this.reviewsService.runRecommendationSystem().subscribe(resp => {
          console.log("gata")
          console.log(resp)
          
          this.reviewsService.getRecommendedMovies().subscribe(res2 => {
            // console.log(res2)
            this.recommended = res2[0].recommended_movies
            // console.log(this.recommended)
            this.recommendedMoviesArray = this.recommended.split(',')
            console.log(this.recommendedMoviesArray)
            if(this.recommendedMoviesArray.length == 1){
              this.loading = true;
              this.sorry = true;
            }
            else{
              this.loading = false;
            }

            
          })
          
        }) 

        
    })

    }
  }



}
