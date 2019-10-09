import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private base_url = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  getRestaurants(filters, page, size, sort): Observable<any> {
    const url = this.createUrl(filters, page, size, sort);
    return this.http.get(url, this.httpOptions);
  }

  createUrl(filters, page, size, sort): string {
    const name = filters.name;
    let url = this.base_url;
    let c = 0;
    if (name) {
      url = this.base_url + 'name=' + name;
      c++;
    }
    if (filters.cuisinesList.length > 0) {
      const cuisinesList = filters.cuisinesList;
      const cuisines = cuisinesList.map(item => item.name).join(',');
      if (cuisines.length > 0) {
        if (c) { url += '&'; }
        url += 'cuisines=' + cuisines;
      }
    }
    if (c) { url += '&'; }
    url = url + 'page=' + page + '&size=' + size + '&sort=' + sort;
    return url;
  }
}
