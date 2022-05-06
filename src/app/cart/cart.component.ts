import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/Cart';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/User';
import { lastValueFrom } from 'rxjs';
import { BooksToBuy } from 'src/app/models/BooksToBuy';
import { LoginService } from '../services/login.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userId!: number;
  cart!: any;
  items!: any[];
  priceTotal!: Cart[];
  booksToBuy!: BooksToBuy[];
  searchItem = '';

  mySubscription: any;


  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.checkLoginStatus();
    this.getCartProduct();
    this.setUp();
  }

  quantityToBuy:number=2;

  setUp() {
    this.cartService.checkCart();
    this.items =this.cartService.items
  }

  getCartProduct(){
    this.cartService.sub.subscribe((res) => {
      this.cart = res;
    });
  }
  addQuantity(pId: number ,name : string,  quantity: number, price: number, author: string, image:string, quantityOnHand: number) {
    if (quantity < quantityOnHand){
      let newQuantity = quantity + 1;
      this.cartService.addToCart(pId, name, newQuantity, price, author, image, quantityOnHand)
    }
  }
  subQuantity(pId: number ,name : string,  quantity: number, price: number, author: string, image:string, quantityOnHand: number){
    if (quantity >1){
      let newQuantity = quantity - 1;
      this.cartService.addToCart(pId, name, newQuantity, price, author, image, quantityOnHand)
    }
  }


  checkLoginStatus(){
    this.loginService.checkLoginStatus().subscribe({
      next: (res) => {
        if (res.status === 200) {
          let body = <User>res.body;
          if (body.role === 'Customer') {
            this.userId = body.userId;
            this.cartService.getCartFromCustomerPage(String(this.userId));
          }
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.router.navigate(['']);
        }
      },
    });
  }

   onDeleteButtonClick(productId: number) {
    this.cartService.deleteProductFromCart(productId);
    this.setUp();
    // window.location.href = '/cart';

  }

  calculateTotalPrice(){

    let total:number = 0;
    this.items.forEach(function(item:any){
     total += item.quantityToBuy * item.bookPrice;
    });
    return total.toFixed(2)!;
      // return items.reduce((previousValue: number, currentValue: { items: { bookPrice: number; }; quantityToBuy: number; }) =>
      // previousValue + currentValue.bookPrice * currentValue.quantityToBuy, 0);

  }

  // for future ref
  newRefreshPage(){
    this.ngOnInit();
  }

  refreshPage(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentRoute]);
    })
  }
}
