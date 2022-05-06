import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SearchProducts } from 'src/app/models/SearchProduct';
import { DisplayProductModalComponent } from '../display-product-modal/display-product-modal.component';
import { Genre } from '../models/genre';
import { LoginService } from '../services/login.service';
import { SearchProductsService } from '../services/search-products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private getGenreService: SearchProductsService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getByGenre(this.selectedIndex,0);
  }

  displayProducts: SearchProducts[] = [];
  selectedIndex: string = "fiction";
 
  selectedProducts!: SearchProducts;
  genre: string[]=["fiction","nonfiction","science fiction", "fantasy","biography"];



  // bookId!: number;
  dialogResult!: string;


  getSelectedIndex(): string {
    return this.selectedIndex;
  }

  onTabChange(event: MatTabChangeEvent){
    console.log("event:"+event.index)
    this.getByGenre(this.genre[event.index],event.index);
  }


  getByGenre(genre: string, index:number) {
    this.selectedIndex=this.genre[index];
    this.getGenreService.getSearchByGenre(genre).subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      this.displayProducts = body
    })
  }

  onDisplayProduct(book: SearchProducts){
    let modalRef = this.dialog.open(DisplayProductModalComponent, {
      width: '1400px',
      height: '700px',
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

  showResults: SearchProducts[] = [];
  setShowResults(showResults: SearchProducts[]) {
    this.showResults = showResults;
  }

  showKeyword!: string;
  setShowKeyowrd(showKeyword: string){
    this.showKeyword = showKeyword;
    this.showSearchResults();
  }

  showSearchResults(){
    this.getGenreService.getSearchResult(this.showKeyword).subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      this.showResults = body;
  })
  }

}


