import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from '../services/login.service';
import { SignupService } from '../services/signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService, 
    private signupService: SignupService, private route: ActivatedRoute) { }

  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  age!: number;
  email!: string;
  birthday!: string;
  address!: string;
 

  // show / hide password
  hide = true;

  // succssmessage
  successMessage!: string;

  // err message
  errorMessage!: string;

  ngOnInit(): void {
   
  }

  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200 || res.status === 201){
        let body = <User> res.body;

        if(body.role === 'Customer'){
          this.router.navigate(['/login']); // navigates to customer route page
        }

        if(body.role === 'Admin'){
          this.router.navigate(['/admin']); // navigates to admin route page
        }
      }
    });
  }

  onSignupClick() {
    this.signupService.signup(this.username, this.password, this.firstName, 
      this.lastName, this.age, this.email, this.birthday, this.address).subscribe((res) => {
      if (res.status === 201 || res.status === 200){
        this.router.navigate(['/login']);
        // if (res.body){
        //   this.successMessage = '';
        //    // this.successMessage = res.body;
        //     this.ngOnInit();
        // }
      }
    }, (err) => {
      this.errorMessage = '';
      this.errorMessage = err.error;
    } )
  }



}
