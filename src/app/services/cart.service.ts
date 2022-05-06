import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, windowWhen } from 'rxjs';
import { Cart } from 'src/app/models/Cart';

import { Products } from 'src/app/models/Products';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  sub: Subject<Cart> = new Subject();
  items: any[] = [];
  p!: Products;
  private host = environment.hostURL;
  checkCart(){

      if (window.localStorage.getItem("cart")){
        let cart =window.localStorage.getItem("cart");
        this.items = JSON.parse(cart!);
      }

  }

  addToCart(pId: number ,name : string,  quantity: number, price: number, author: string, image:string, quantityOnHand: number) {
    let item = {
      bookId:pId,
      bookName: name,
      quantityToBuy:quantity,
      bookPrice: price,
      author: author,
      bookImage: image,
      quantityOnHand:quantityOnHand
    }
    let exist=false;



    this.items.map((cartProduct)=>{
      if(cartProduct.bookId == item.bookId){
        exist = true;
        cartProduct.quantityToBuy = quantity;
      }
    })
    if (exist == false){
      this.items.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(this.items));

  }

  getCartFromCustomerPage(userId: string) {
    return this.http.get<Cart>(`${this.host}/users/${userId}/cart`, {
     // `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {
        withCredentials: true
      }).subscribe((res)=> {
        this.sub.next(res);
      })
  }

  deleteProductFromCart(bookId: number, ) {

    this.items = this.items.filter((product)=> product.bookId !== bookId)
    localStorage.setItem('cart', JSON.stringify(this.items));

    // return this.http.delete(`http://localhost:8081/users/${userId}/cart`, {
    // //  `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {

    //   withCredentials: true,
    //   observe: 'response',
    //   params: {
    //     'bookId': bookId,
    //   },
    // });
  }
}
