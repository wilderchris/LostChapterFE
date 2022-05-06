import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private host = environment.hostURL;

  constructor(private http: HttpClient) { }

  signup(username: string, password: string, firstName: string,
     lastName: string, age: number, email: string, birthday: string, address: string ){
    // return this.http.post(`http://localhost:8081/users`,{
      return this.http.post(`${this.host}/users`,{
    //return this.http.post(`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/signup`, {
      "username": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "age": age,
      "email": email,
      "birthday": birthday,
      "address": address,
      "role": "Customer"
    }, {
     // withCredentials: true,
      observe: 'response',
    //  responseType: 'text'
    })
  }
}
