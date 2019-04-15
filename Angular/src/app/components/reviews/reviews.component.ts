import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  positive: any;
  negative: any;

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.reviewsService.getPositiveReviews().subscribe(res => {
      this.positive=res;
      console.log(this.positive)
    })

    this.reviewsService.getNegativeReviews().subscribe(res => {
      this.negative=res;
      console.log(this.negative)
    })

  }

}
