import { User } from 'src/app/models/User';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SearchProducts } from 'src/app/models/SearchProduct';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SearchProductsService } from '../services/search-products.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-indexnavbar',
  templateUrl: './indexnavbar.component.html',
  styleUrls: ['./indexnavbar.component.css']
})
export class IndexnavbarComponent implements OnInit {
  // boolean checks to make the navbar dynamic based on login status
  loggedIn:boolean= false;
  // notLoggedIn:boolean= true;
  // ableToSignUp:boolean= true;
  // ableToLogIn:boolean= true;
  d:Date = new Date("1993-03-01");
  role!:String;
  currentUser!: String;
  loggedInUser: User;
  // boolean check to properly redirect user to their profile page
  roleIsCustomer:boolean= false;
  roleIsAdmin:boolean = false;

  constructor(private loginService:LoginService, private http: HttpClient, private searchProductService: SearchProductsService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.loggedInUser = user !== null ? user : null;
      this.currentUser = this.loggedInUser.username;
      this.loggedIn = true;
      this.role = this.loggedInUser.role;

    }
    // get current signed in user, so it will be used to toggle loggedInTrue and show the user's username
  }

  logout(){
    this.authenticationService.logOut();
    this.loggedIn = false;
    this.loggedInUser = null;
    this.currentUser = '';
    this.role = '';
    // if (this.role  === 'Customer'){
    //   this.loginService.logout().subscribe((res) => {
    //     if (res.status === 200 || res.status === 201){
    //       // toggling booleans
    //       this.loggedIn = !this.loggedIn;
    //       this.ableToSignUp = !this.ableToSignUp;
    //       this.ableToLogIn = !this.ableToLogIn;
    //       this.notLoggedIn = !this.notLoggedIn;
    //     }
    //   });

    // }
    // if (this.role  === 'Admin'){
    //   this.loginService.logout().subscribe((res) => {
    //     if (res.status === 200 || res.status === 201){
    //       // toggling booleans
    //       this.loggedIn = !this.loggedIn;
    //       this.ableToSignUp = !this.ableToSignUp;
    //       this.ableToLogIn = !this.ableToLogIn;
    //       this.notLoggedIn = !this.notLoggedIn;
    //     }
    //   });

    // }
  }
  searchProduct!: SearchProducts;

  isSearchBlank!: true;

  searchItem = '';

  searchKeyword!: string;
  @Output('searchKeyword') searchKeywordEmitter = new EventEmitter<string>()

  // for page pagination
  // p: number = 1;
  // collection: any[] = someArrayOfThings;

  displaySearchResults() {
    if (this.searchItem === ''){
      this.router.navigate([''])
    }
    // searchKeyword Emmitter
    this.searchKeywordEmitter.emit(this.searchItem);

  }
}
function user(user: any): string {
  throw new Error('Function not implemented.');
}

