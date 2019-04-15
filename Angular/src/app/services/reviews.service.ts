
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders, HttpClient, HttpParams } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {


  constructor(private http: HttpClient) { }

  
  getReviews() {
    return this.http.get(`http://localhost:3001/reviews/getReviews`);
  }

  addReview(review: any) {
    return this.http.post(`http://localhost:3001/reviews/addReview`, review);
  }

  runSentimentAnalysis() {
    return this.http.get(`http://localhost:3001/reviews/runSentimentAnalysis`);
  }

  runRecommendationSystem() {
    return this.http.get(`http://localhost:3001/reviews/runRecommendationSystem`);
  }

  getSentimentOfLastReview(){
    return this.http.get(`http://localhost:3001/reviews/getSentimentOfLastReview`);
  }

  postMovieForRecommendation(movie: any){
    return this.http.post(`http://localhost:3001/reviews/postMovieForRecommendation`, movie);
  }

  getRecommendedMovies(){
    return this.http.get(`http://localhost:3001/reviews/getRecommendedMovies`);
  }

  getPositiveReviews(){
    return this.http.get(`http://localhost:3001/reviews/getPositiveReviews`);
  }

  getNegativeReviews(){
    return this.http.get(`http://localhost:3001/reviews/getNegativeReviews`);
  }


 
}
