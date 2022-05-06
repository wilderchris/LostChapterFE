import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-reviewcard',
  templateUrl: './reviewcard.component.html',
  styleUrls: ['./reviewcard.component.css']
})
export class ReviewcardComponent implements OnInit {
  @Input() review2!: Review;
  @Output() emits = new EventEmitter();



  constructor(private revServ:ReviewService) { }

   async ngOnInit(): Promise<void>{
    // this.reviews =  await this.revServ.getAllReviewsbyBookId(2);
    // console.log(this.reviews);
  }

// getBookReview(bookId:number){
//   this.reviews = await this.revServ.getAllReviewsbyBookId(bookId);
//  // console.log(this.reviews);
// }
}
