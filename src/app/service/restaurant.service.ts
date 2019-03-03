import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private url = "assets/restaurant-data.csv";

  constructor(private http: HttpClient) { }
/* Observable<Restaurant> */
  getRestaurants() : Observable<String> {
    return this.http.get(this.url, {responseType: 'text'});
  }
}
