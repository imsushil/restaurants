import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private base_url = 'http://localhost:8081/restaurants?';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  getRestaurants(page, size, sort): Observable<any> {
    let url;
    url = this.base_url + 'page=' + page + '&size=' + size + '&sort=' + sort;
    return this.http.get(url, this.httpOptions);
  }

  getRestaurantsByNameAndCuisines(name, cuisinesList, page, size, sort): Observable<any> {
    const cuisines = cuisinesList.map(item => item.name).join(',');
    let url = this.base_url;
    let c = 0;
    if (name) {
      url = this.base_url + 'name=' + name;
      c++;
    }
    if (cuisines.length > 0) {
      if (c) { url += '&'; }
      url += 'cuisines=' + cuisines;
    }
    url = url + '&page=' + page + '&size=' + size + '&sort=' + sort;
    console.log(url);
    return this.http.get(url, this.httpOptions);
  }
}
