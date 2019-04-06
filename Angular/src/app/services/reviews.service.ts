
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders, HttpClient, HttpParams } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {


  constructor(private http: HttpClient) { }

  
  getReviews() {
    return this.http.get(`/reviews/getReviews`);
  }

  addReview(review: any) {
    return this.http.post(`/reviews/addReview`, review);
  }


 
}
