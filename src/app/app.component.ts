import { Component, OnInit } from '@angular/core';
import {RestaurantService} from './service/restaurant.service'
import * as csv2json from 'csvjson-csv2json'
import { Restaurant } from './modal/Restaurant';
import { NgxSpinnerService } from 'ngx-spinner';
import { $ } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'restaurants';
  p: number = 1;
  restaurants: Array<Restaurant>;
  restaurantName: String = "";
  cuisineName: String = "";
  dataFetched: boolean = false;
  userRating: string = "";
  itemsPerPage: number = 25;
  cuisineSet: Set<String>;
  cuisineList: Array<any>;

  constructor(private restaurantService: RestaurantService, private spinner: NgxSpinnerService) {
    this.restaurants = new Array();
    this.cuisineList = new Array();
    this.cuisineSet = new Set();
  }

  ngOnInit() {
    this.getRestaurants();
  }

  private getRestaurants(): void {
      this.spinner.show();
      this.dataFetched = false;
      /*
        Fetching restaurant data (csv file) from the restaurantService class 
       */
      this.restaurantService.getRestaurants().subscribe(data => {
        this.dataFetched = true;
        // converting csv to json using csv2json library
        var json = csv2json(data, {parseNumbers: true});
        
        json.forEach(el => {
          var restaurant: Restaurant = this.setRestaurant(el);
          this.restaurants.push(restaurant);
        });
        this.restaurants = this.restaurants.splice(0,1000);
        /* 
          convert set to array to display the cuisine list in filters section
         */
        this.cuisineSet.forEach((value: string, key: string) => {
            this.cuisineList.push({"name": value, "checked": false});
        });
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
    let cuisine = el["Cuisine Style"].trim();
    let cuisines = cuisine.substring(1, el["Cuisine Style"].length-1).split(",");
    let c = "";
    for(let cuisine of cuisines) {
      cuisine = cuisine.trim();
      cuisine = cuisine.substring(1, cuisine.length-1);
      if(cuisine !== "") {
        this.cuisineSet.add(cuisine);
        c = c + cuisine + " | ";
      }
    }
    restaurant.setCuisine(c.substring(0, c.length-2));
    restaurant.setRanking(el["Ranking"]);
    restaurant.setRating(el["Rating"]);
    restaurant.setReviews(el["Number of Reviews"]);
    var rand = Math.floor(Math.random()*(20-1+1)+1);
    restaurant.setImgUrl("assets/img/" + rand +".jpg");
    return restaurant;
  }

  /* returns the selected(filtered) cuisines from the list of cuisines */
  private getSelectedCuisines(): any[] {
    return this.cuisineList.filter((item) => item.checked );
  }

  /* Clear all filters */
  public clearFilters(): void {
    // clear filter on cuisine
    this.cuisineList.forEach((item) => {
        item.checked = false
    });
  }

  public showFilters(): void{
    document.getElementById("filter-overlay").style.display="block";
  }

  public hideFilters(): void {
    document.getElementById("filter-overlay").style.display="none";
  }
}
