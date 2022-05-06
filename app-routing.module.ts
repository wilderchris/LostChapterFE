import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';
import { CheckoutSummaryComponent } from 'src/app/checkout-summary/checkout-summary.component';
import { SearchResultsComponent } from 'src/app/search-results/search-results.component';
import { HomeComponent } from 'src/app/home/home.component';
import { UpdateBookComponent } from 'src/app/update-book/update-book.component';
import { WishlistComponent } from 'src/app/wishlist/wishlist.component';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';

const routes: Routes = [

  {path: '', component: LandingPageComponent},
  // Please change this to which ever component you are testing and implementing
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'checkout-summary/:transactionId',
    component: CheckoutSummaryComponent
  },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    canActivate: [AuthenticationGuard]
  },
  {path: 'cart', component: CartComponent},
  {path: 'search-results/:searchKeyword', component: SearchResultsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'admin/book/:bookId', component: UpdateBookComponent}
  // {path: 'wishlist', component:WishlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // , { useHash: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
