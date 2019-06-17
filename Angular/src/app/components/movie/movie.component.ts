import { Component, OnInit } from '@angular/core';
import { MoviedbService } from "../../services/moviedb.service";
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from 'src/app/services/reviews.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  runAnalysis: boolean;
  analyze: boolean = false;
  showAddReview: boolean = false;
  text: any = '';
  errorMessage: any = '';
  disableSubmitReview = true;
  reviewInserted: any = {};
  listOfReviews: any = [];
  reviewsAddedByUser: boolean = false;
  showAnalysisAfterInsert: boolean = false;
  finalProcent: any;


  constructor(private router: ActivatedRoute,
    private moviedb: MoviedbService, private reviewsService: ReviewsService, private spinner: NgxSpinnerService) { }

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

            this.moviedb.getReview(this.reviewId).subscribe(y => {
    
              this.review=y;
              console.log(this.review)

              //verific daca este in baza de date si daca are review-ul completat
              this.reviewsService.getSentimentForSpecificReview(this.review.media_title, this.review.author).subscribe(response => {
                if(response[0][0]){
                  console.log(response[0][0].sentiment);
  
                  if(response[0][0].sentiment != 0){
                    this.show = true;
                    this.finalSentiment = response[0][0].sentiment; 
                    this.finalProcent = +response[0][0].procent;
                    this.finalProcent = this.finalProcent * 100;
                    console.log(this.finalProcent)
                  }
                  // else{
                    
                  //   this.reviewsService.addReview(this.review).toPromise().then(res => {
                  //     console.log(res);
                  //     this.analyze = true;
                  //     console.log(this.analyze)
                  //   })
                  // }
                } 
                //nu este in baza de date si il adaug acum
                else{
                   this.reviewsService.addReview(this.review).toPromise().then(res => {
                    console.log(res);
                    this.analyze = true;
                    console.log(this.analyze)
                  })
                } 
                
              })
 

               
            })
          }
          else{

              this.reviewNotAvailable = true;

          }

            //verific daca am review-uri adaugate de alti useri
            this.reviewsService.getReviewsAddedByUser(this.movie.title).subscribe(reviewResult => {
              console.log(reviewResult[0]); 
              if(reviewResult[0].length > 0){
                this.reviewsAddedByUser = true;
                this.showAnalysisAfterInsert = true;
                this.listOfReviews = reviewResult[0];
                console.log(this.listOfReviews)

                //pt fiecare review in parte trebuie sa epelez getSentimentForSpecificReview()
              }
             
            })
            
          
        })

        if(localStorage.getItem('name') != null){
          this.showAddReview = true;
          console.log(this.showAddReview)
        }
    })

  }


  runAnalysisFunction(){
    // this.runAnalysis = false;
    this.spinner.show();

    //sa ruleze partea de python
    //sa ia la final sentimentul din tabela si sa afiseze pe ecran
    if(this.analyze == true){
      this.analyze=false;
      this.reviewsService.runSentimentAnalysis().subscribe(res => {
        console.log("gata")
  
        this.reviewsService.getSentimentOfLastReview().subscribe(resp => {
          // console.log(resp) 
          console.log(resp[0].sentiment)
          this.finalSentiment = resp[0].sentiment;
          this.finalProcent = +resp[0].procent;
          this.finalProcent = this.finalProcent * 100;
          console.log(this.finalProcent)
          this.show = true;
          this.showAnalysisAfterInsert = true;
          // this.runAnalysis = true;
          this.spinner.hide(); 
          window.location.reload();

           })
      })
    }
  }

  //cand se adauga review de la user, atunci trebuie sa apara butonul de runAnalysis pentru el

  addReviewByUser(){
    // console.log(this.movie.title)
    if (this.text == '') {
      this.errorMessage = 'You must write something in your review';
    }
    else{
      this.reviewsAddedByUser = true;
      this.reviewInserted={
        content: this.text,
        author: localStorage.getItem('name'),
        url: "",
        media_title: this.movie.title
      }
      this.reviewsService.addReview(this.reviewInserted).toPromise().then(res => {
        console.log(res);
        this.showAnalysisAfterInsert = false;
        this.analyze = true;
      })
      this.listOfReviews.push(this.reviewInserted);
      console.log(this.listOfReviews);
    }
  }

  
  changeCommentContent(event) {
    this.text = event;
    if (event.length == 0 && event == '' && this.text.length == 0 && this.text == '') {
      this.disableSubmitReview = true;
    } else this.disableSubmitReview = false;
  }



}
