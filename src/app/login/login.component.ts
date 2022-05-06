import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from '../services/authentication.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() login: EventEmitter<any> = new EventEmitter();

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private loginService: LoginService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    // this.checkIfLoggedIn();
  }

  username!: string;
  password!: string;
  errorMessage!: string;

  // show / hide password
  hide = true;

  // perform service layer functionality here
  onLogIn() {
    // this.loginService.login(this.username, this.password).then((res) => {

    // this.login.emit();

    let credentials = {
          username: this.username,
          password: this.password,
        };

    this.subscriptions.push(
    this.loginService.login(credentials).subscribe(
        (response: HttpResponse<User>) => {
          if(response.status === 201 || response.status === 200) {
            const token = response.headers.get('Jwt-Token');
            console.log('LOGGED IN. TOKEN: ' + token);
            this.authService.saveToken(token);
            this.authService.addUserToLocalCache(response.body);

            this.router.navigate(['/home']);
          }

        }
      )
    )



    //   if (res.status === 201 || res.status === 200) {
    //     let body = <User> res.body;
    //     console.log(res);
    //     if (body.role === 'Customer'){
    //       this.router.navigate(['/home']); // navigates to customer route page -> redirecting to this route for now until we have full functionalities of the routes
    //     }

    //     if (body.role === 'Admin'){
    //       this.router.navigate(['/home']); // navigates to admin route page
    //     }
    //   }
    // },
    //   (err) => {
    //     this.errorMessage = err.error;
    //   });

  // })
}




  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          // depending on the status
          let body = <User>res.body;

          if (body.role === 'Customer') {
            this.router.navigate(['']);
          }

          if (body.role === 'Admin') {
            this.router.navigate(['/admin']);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => {
      sub.unsubscribe;
    });
  }

}
