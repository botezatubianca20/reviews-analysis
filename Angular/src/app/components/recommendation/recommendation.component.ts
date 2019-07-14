import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  noResp: boolean = true;
  messageSuccess: any = ''

  
  constructor(private reviewsService: ReviewsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  ngOnChange(){
    this.loading  = true;
  }


  onKeydown(event, item: any) {
    if (event.key === "Enter") {
      // this.spinner.show();
      // console.log(event);
      // console.log(item)
      this.movie = {movie: item};

      this.reviewsService.postMovieForRecommendation(this.movie).toPromise().then(res => {
        console.log(this.movie)
        console.log(res)

        this.reviewsService.runRecommendationSystem().subscribe(resp => {
          
          this.noResp = false;
          console.log("gata")
          console.log(resp)
          
            this.reviewsService.getRecommendedMovies().subscribe(res2 => {
              this.sorry = false;
              // console.log(res2)
              this.recommended = res2[0].recommended_movies
              // console.log(this.recommended)
              this.recommendedMoviesArray = this.recommended.split(',')
              console.log(this.recommendedMoviesArray)
              this.loading = false;

              // this.spinner.hide();
              // if(this.recommendedMoviesArray.length == 1){
              //   this.loading = true;
              //   this.sorry = true;
              // }
            
              
            })
        })
        
        if(this.noResp = true){
          this.loading=true;
          this.sorry=true;
        }


        

        
    })

    }
  }


}
