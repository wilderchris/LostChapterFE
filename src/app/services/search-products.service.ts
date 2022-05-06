import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {
  private host = environment.hostURL;
  constructor(private http: HttpClient) { }

  getAllGenre(){
    return this.http.get(`${this.host}/book/genre`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/search/${searchItem}`, {
      observe: 'response'
    })

  }

  getAllBooks(){
    return this.http.get(`${this.host}/book`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/search/${searchItem}`, {
      observe: 'response'
    })
  }

  getSearchResult(searchItem: string){
    return this.http.get(`${this.host}/book/search/${searchItem}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/search/${searchItem}`, {
        observe: 'response'
    })
  }

  getSearchByGenre(genre: string){
    return this.http.get(`${this.host}/book/genre/${genre}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/genre/${genreId}`, {
      observe: 'response'
    })
  }

  getBookBySales(){
    return this.http.get(`${this.host}/book/books/sales`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/sales`, {
      observe: 'response'
    })
  }

  addToCart(productId: string, quantity: string, userId: string){
    let parameter = new HttpParams();
    parameter = parameter.append('bookId', productId);
    parameter = parameter.append('quantityToBuy', quantity);
    return this.http.post(`${this.host}/users/{userId}/cart`, {},
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {},
      {
        "params": parameter,
        withCredentials: true,
        observe:'response'
      })
  }

  getBookById(bookId: number){
    return this.http.get(`${this.host}/book/${bookId}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/${bookId}`, {
      observe: 'response'
    })
  }

  getFeaturedBooks(){
    return this.http.get(`${this.host}/book/featured`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/featured`, {
      observe: 'response'
    })
  }



}


