import { animate, AnimationBuilder, AnimationFactory, style } from '@angular/animations';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Slick } from 'ngx-slickjs';
import { SearchProducts } from 'src/app/models/SearchProduct';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/User';
import { DisplayProductModalComponent } from '../display-product-modal/display-product-modal.component';
import { LoginService } from '../services/login.service';
import { SearchProductsService } from '../services/search-products.service';


@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {

  constructor(private getGenreService: SearchProductsService, private cartService: CartService, private router: Router,
    private featuredService: SearchProductsService, private loginService: LoginService, public dialog: MatDialog,
    private elementRef: ElementRef, private animationBuilder: AnimationBuilder) { }

  cartId!: number;
  showResults: SearchProducts[] = [];
  selectedProducts!: SearchProducts;
  dialogResult!: string;

  // carousel
  arrayLength = 10;

  ngOnInit(): void {
    // this.checkLoginStatus();
    this.getFeaturedBooks();
  }

  checkLoginStatus(){
    this.loginService.checkLoginStatus().subscribe({
      next: (res) => {
        if (res.status === 200) {
          let body = <User>res.body;
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

  getFeaturedBooks(){
    this.featuredService.getFeaturedBooks().subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      this.showResults = body;
    })
  }


  onDisplayProduct(book: SearchProducts){
    let modalRef = this.dialog.open(DisplayProductModalComponent, {
      //width: '780px',
      //height: '600px',
      data: book
    });

      this.getGenreService.getBookById(book.bookId).subscribe((res) => {
          let responseObj = <SearchProducts>res.body;
          this.selectedProducts = responseObj

          let instance = modalRef.componentInstance;
          instance.selectedProducts = this.selectedProducts;

      });

    modalRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });

  }

  // carousel animation using ngx slick js

  config: Slick.Config = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: 'linear'
  }

  getArray(count: number){
    return new Array(count);
  }

}
