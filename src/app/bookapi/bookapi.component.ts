import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIBook } from './apibook';

@Component({
  selector: 'app-bookapi',
  templateUrl: './bookapi.component.html',
  styleUrls: ['./bookapi.component.css']
})
export class BookapiComponent  {
apiBook!: APIBook;
title!: 'the+lord+of+the+rings';
  http!: HttpClient;

 

  constructor(http: HttpClient) { }
  ngOnInit(): void {
    // ngOnInit is a component lifecycle method
    // which runs when the component initializes
    //this.myArr = [1,2,3,4,5];

    this.getBook();
  }



  getAPIBook(title:string): Observable<APIBook> {
    return this.http.get('https://openlibrary.org/search.json?title=' + title).pipe(
      map(resp => resp as APIBook)
    );
  }


  async getBook() {
    //this.pokemon = await this.fetchServ.getPokemon(this.idInput);

    this.getAPIBook(this.title).subscribe(
      resp => {
        this.apiBook = resp;
        console.log(this.title);
    });
  }


}
