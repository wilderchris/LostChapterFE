import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BooksToBuy } from '../models/BooksToBuy';
import { Products } from '../models/Products';
import { Review } from '../models/review';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
review!:Review;
private host = environment.hostURL;
//book!:Products;
  //book!:Products;
  public bookId!: number;

  constructor(private http: HttpClient) { }

  getAllReviews() {
    return this.http.get(`${this.host}/reviews`, {
    // `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/reviews`, {
      observe: 'response'
  })
  }

  getReviewById(reviewId: String) {
    return this.http.get(`${this.host}/reviews/${reviewId}`, {
    //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/reviews/${reviewId}` , {
      observe: 'response'
    })
  }
  sendReview(review:Review): Observable<Review>{
    console.log(review);
    return this.http.post<Review>(`${this.host}/reviews/`, review);
  }


  updateReviewById(reviewId: String, updatedReview: Review) {
    return this.http.put(`${this.host}/reviews/${reviewId}`,
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/reviews/${reviewId}`, 
      {
      "updatedReview": updatedReview
      }, 
      {
      withCredentials: true,
      observe: 'response',
      }
    );
  }

  // async getAllReviewsForBook(bookId: number) {
  //   let resp = await fetch(`http://localhost:8081/reviews/book/`+bookId);
  //   if (resp.status===200) {
  //     return await resp.json();
  //   }
  // }
 
// want Observable of Show[]
getAllReviewsbyBookId(bookId:number){
  return this.http.get(`${this.host}/reviews/book/${bookId}`, {
    //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/genre/${genreId}`, {
    observe: 'response'
  })
}
}
