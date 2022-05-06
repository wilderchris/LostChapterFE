import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchProducts } from 'src/app/models/SearchProduct';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/User';
import { Cart } from 'src/app/models/Cart';
import { LoginService } from '../services/login.service';
import { SearchProductsService } from '../services/search-products.service';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/review';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-display-product-modal',
  templateUrl: './display-product-modal.component.html',
  styleUrls: ['./display-product-modal.component.css'],
})
export class DisplayProductModalComponent implements OnInit {
  log = console.log;
  reviews!: Review[];
  constructor(
    private revServ: ReviewService,
    private cartService: CartService,
    private router: Router,
    private loginService: LoginService,
    // private CartService: CartService,
    public dialog: MatDialog,
    private getGenreService: SearchProductsService,
    private reviewServ: ReviewService,
    public dialogRef: MatDialogRef<DisplayProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchProducts
  ) {}

  selectedProducts!: SearchProducts;
  errorMessage!: string;
  cartId!: number;
  quantity = 0;
  userId!: number;
  added?: boolean;
  addedToCart = 'Item have been added to Cart';
  bookReviews!: Review[];

  role!: String;

  addToCart = 'Add to Cart';

  ngOnInit() {
    // this.checkLoginStatus();
    this.viewBookReviews(this.data.bookId);
    // console.log(this.reviews);
  }

  viewBookReviews(bookId: number) {
    this.revServ.getAllReviewsbyBookId(bookId).subscribe((res) => {
      this.reviews = <Review[]>res.body;
    });
  }

  onCloseDisplayProduct() {
    this.dialogRef.close('Confirm');
  }

  addBookReview(bookId: number) {
    this.log(bookId);
    this.revServ.bookId = bookId;

    this.dialog.open(ReviewComponent);
  }

  checkLoginStatus() {
    this.loginService.checkLoginStatus().subscribe({
      next: (res) => {
        if (res.status === 200) {
          let body = <User>res.body;
          this.role = body.role;
          console.log(this.role);
          if (body.role === 'Customer') {
            this.cartId = body.userId;
            this.cartService.getCartFromCustomerPage(String(this.cartId));
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

  onAddToCart(productId: number) {
    let quantity: any = this.quantity;
    var item: any;

    if (this.selectedProducts.saleIsActive) {
      item = {
        productId: productId,
        bookName: this.selectedProducts.bookName,
        quantity: parseInt(quantity),
        price:
          this.selectedProducts.bookPrice -
          this.selectedProducts.bookPrice *
            this.selectedProducts.saleDiscountRate,
        author: this.selectedProducts.author,
        bookImage: this.selectedProducts.bookImage,
        quantityOnHand: this.selectedProducts.quantityOnHand,
      };
    } else {
      item = {
        productId: productId,
        bookName: this.selectedProducts.bookName,
        quantity: parseInt(quantity),
        price: this.selectedProducts.bookPrice,
        author: this.selectedProducts.author,
        bookImage: this.selectedProducts.bookImage,
        quantityOnHand: this.selectedProducts.quantityOnHand,
      };
    }

    console.log(this.selectedProducts);

    this.cartService.addToCart(
      item.productId,
      item.bookName,
      item.quantity,
      item.price,
      item.author,
      item.bookImage,
      item.quantityOnHand
    );
    window.location.href = '/cart';

    // localStorage.setItem('cart', JSON.stringify(item));
    // console.log(item);
  }
  // this.addProductToCartService
  //   .addToCart(String(productId), String(this.quantity), String(this.cartId))
  //   .subscribe({
  //     next: (res) => {
  //       if (res.status === 200) {
  //         let body = <Cart>res.body;
  //         this.added = true;
  //       }
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.error;
  //     },
  //   });
}
