import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(httpRequest.url.includes(`${this.authenticationService.host}/users/auth`)) {
      return httpHandler.handle(httpRequest);
    }
    if(httpRequest.url.includes(`${this.authenticationService.host}/users/register`)) {
      return httpHandler.handle(httpRequest);
    }
    // if(httpRequest.url.includes(`${this.authenticationService.host}/users`)) {
    //   return httpHandler.handle(httpRequest);
    // }
    // if(httpRequest.url.includes(`${this.authenticationService.host}/book/featured`)) {
    //   return httpHandler.handle(httpRequest);
    // }
    // if(httpRequest.url.includes(`${this.authenticationService.host}/book`)) {
    //   return httpHandler.handle(httpRequest);
    // }

    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `BookMark ${token}`}});
    // console.log('TOKEN: ' + token);

    return httpHandler.handle(request);
  }
}
