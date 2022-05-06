import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private host = environment.hostURL;
  constructor(private http: HttpClient) { }

  updateBooks(bookId: Number, bookName: string, synopsis: string, author: string, genre: number, quantity: number, year: number, edition: string, publisher: string, saleIsActive: boolean, saleDiscountRate: number, bookPrice: number, bookImage: string, isbn: string){
    return this.http.put(`${this.host}/books/${bookId}`, {
      bookName: bookName,
      synopsis: synopsis,
      author: author,
      genre: genre,
      quantity:quantity,
      year: year,
      edition: edition,
      publisher: publisher,
      saleIsActive: saleIsActive,
      saleDiscountRate: saleDiscountRate,
      bookPrice: bookPrice,
      bookImage: bookImage,
      isbn: isbn
    },
    {
      withCredentials: true,
      observe: 'response'
    }
    )
  }
}
