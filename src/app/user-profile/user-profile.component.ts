import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from '../services/login.service';
import { AuthenticationService } from '../services/authentication.service';
import { AgePipe } from '../age.pipe';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService, private authenticationService: AuthenticationService) {}
  loggedInUser: User;
  // succssmessage
  successMessage!: string;

  // err message
  errorMessage!: string;

  currentUser!: User;

  getLoggedUser() {
    if(this.authenticationService.isLoggedIn()) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.loggedInUser = user !== null ? user : null;
     console.log(this.loggedInUser);

    }
  }
  ngOnInit(): void {
    this.getLoggedUser();
  }

  onUpdateClick() {
    this.loginService
      .updateUser(
        this.loggedInUser.userId,
        this.loggedInUser.username,
        this.loggedInUser.password,
        this.loggedInUser.firstName,
        this.loggedInUser.lastName,
        this.loggedInUser.email,
        this.loggedInUser.birthday,
        this.loggedInUser.role
      )
      .subscribe((res) => {
        if (res.status === 200) {
          this.successMessage = 'Your update is successful';
          let body = <User>res.body;
          this.loggedInUser = body;
        }
      },
      (err) => {
        this.errorMessage = '';
        this.errorMessage = err.error;
      });
  }
}
