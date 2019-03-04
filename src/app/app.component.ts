import { Component, OnInit } from '@angular/core';
import {RestaurantService} from './service/restaurant.service'
import * as csv2json from 'csvjson-csv2json'
import { Restaurant } from './modal/Restaurant';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restaurants';
  restaurants: Array<Restaurant>;
  restaurantName: String = '';
  dataFetched: boolean = false;

  constructor(private restaurantService: RestaurantService, private spinner: NgxSpinnerService) {
    this.restaurants = new Array();
  }

  ngOnInit() {
    this.getRestaurants();
  }

  

  private getRestaurants(): void {
    this.spinner.show();
    this.dataFetched = false;
    this.restaurantService.getRestaurants().subscribe(data => {
      this.dataFetched = true;
      var json = csv2json(data, {parseNumbers: true});
      
      json.forEach(el => {
        var restaurant: Restaurant = this.setRestaurant(el);
        this.restaurants.push(restaurant);
      });
      this.restaurants = this.restaurants.splice(0,100);
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.dataFetched = true;
    });
  }

  private setRestaurant(el): Restaurant {
    var restaurant = new Restaurant();
    restaurant.setName(el["Name"]);
    restaurant.setCity(el["City"]);
    restaurant.setCuisine(el["Cuisine Style"].substring(1, el["Cuisine Style"].length-1).split(",").join(" | "));
    restaurant.setRanking(el["Ranking"]);
    restaurant.setRating(el["Rating"]);
    restaurant.setReviews(el["Number of Reviews"]);
    var rand = Math.floor(Math.random()*(20-1+1)+1);
    restaurant.setImgUrl("assets/img/" + rand +".jpg");
    return restaurant;
  }
}
