import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private host = environment.hostURL;
  constructor(private http: HttpClient) { }

  cartCheckout(cardNumber: string, expirationMonth: string, expirationYear: string, securityCode: string, cardholderName: string,
    firstName: string, lastName: string, streetName: string, city: string, state: string, zipCode: string, deliveryDate: string){
    return this.http.post(`${this.host}/user/checkout`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/user/checkout`, {

      "cardNumber": cardNumber,
      "expirationMonth": expirationMonth,
      "expirationYear": expirationYear,
      "securityCode": securityCode,
      "cardholderName": cardholderName,
     "shippingAddress": {
      "firstName": firstName,
      "lastName": lastName,
      "streetName": streetName,
      "city": city,
      "state": state,
      "zipCode": zipCode,
      "deliveryDate": deliveryDate
     }
    }, {
      withCredentials: true,
      observe: 'response'
    })
  }

  getCheckoutSummary(transactionId: number){
    return this.http.get(`${this.host}/order-confirmation/${transactionId}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/order-confirmation/${transactionId}`, {
      withCredentials: true,
      observe: 'response'
    })
  }

}
