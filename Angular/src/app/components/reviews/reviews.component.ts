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
      for(var i=0; i<this.positive.length; i++){
        if((this.positive[i].content.includes("not") || this.positive[i].content.includes("Not"))  && this.negative[i].content.length<=25){
          const index: number = this.positive.indexOf(this.positive[i]);
          if (index !== -1) {
              this.positive.splice(index, 1);
           }   
        }
      }
      console.log(this.positive)
    })

    this.reviewsService.getNegativeReviews().subscribe(res => {
      this.negative=res;
      for(var i=0; i<this.negative.length; i++){
        if((this.negative[i].content.includes("not") || this.negative[i].content.includes("Not")) && this.negative[i].content.length<=25){
          const index: number = this.negative.indexOf(this.negative[i]);
          if (index !== -1) {
              this.negative.splice(index, 1);
           }   
        }
      }
      console.log(this.negative)
    })

  }

}
