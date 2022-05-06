import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.hostURL;
  public token: string;
  public loggedInUsername: string;
  public jwtHelper = new JwtHelperService;

  constructor(private http: HttpClient) {
    this.token = '';
    this.loggedInUsername = null;
  }

  public logOut(): void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    let item = localStorage.getItem('user');
    return item !== null ? JSON.parse(item) : item;
  }

  public loadToken(): void {
    let item = localStorage.getItem('token');
    this.token = item !== null ? item : '';
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();

    if(this.token != null && this.token !== '') {
      if(this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }

}
