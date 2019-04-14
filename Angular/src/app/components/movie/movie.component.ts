import { Component, OnInit } from '@angular/core';
import { MoviedbService } from "../../services/moviedb.service";
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: any = {};
  loadingMovie: boolean;
  reviewId: any;
  review: any = {};
  reviewNotAvailable: boolean = false;
  finalSentiment: any;
  show: boolean = false;


  constructor(private router: ActivatedRoute,
    private moviedb: MoviedbService, private reviewsService: ReviewsService) { }

  ngOnInit() {

    this.loadingMovie = true;

    this.router.params.subscribe(params => {
      console.log(params);

      this.moviedb.getMovie(params['id'])
        .subscribe(movie => {
          console.log(movie);
          this.movie = movie;
          this.loadingMovie = false;
        })

        this.moviedb.getReviewforMovie(params['id'])
        .subscribe(x => {
          console.log(params['id'])
          console.log(x.results[0])
          if(x.results[0] !== undefined){
            this.reviewNotAvailable = false; 
            this.reviewId = x.results[0].id;
            console.log(this.reviewId)

            this.moviedb.getReview(this.reviewId)
            .subscribe(y => {
    
              this.review=y;
              console.log(this.review)

              this.reviewsService.addReview(this.review).toPromise().then(res => {
                console.log(res);
              })

              //sa ruleze partea de python
              //sa ia la final sentimentul din tabela si sa afiseze pe ecran
              this.reviewsService.runSentimentAnalysis().subscribe(res => {
                console.log("gata")

                this.reviewsService.getSentimentOfLastReview().subscribe(resp => {
                  // console.log(resp)
                  console.log(resp[0].sentiment)
                  this.finalSentiment = resp[0].sentiment;
                  this.show = true;


                })
                
              }) 

              
             

            })
          }
          else{
            this.reviewNotAvailable = true;
          }
          
        })

        


    })




   


    
  }

}
