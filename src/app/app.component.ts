import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './service/restaurant.service'
import { Restaurant } from './modal/Restaurant';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restaurants';
  page = 0;
  totalPages: number;
  itemsPerPage = 25;
  restaurants: Array<Restaurant>;
  restaurantName = '';
  cuisineName = '';
  dataFetched = false;
  sortProperty = 'name';
  cuisineSet: Set<String>;
  cuisineList: Array<any>;
  filters: any;
  nameBeforePressingBack = '';

  constructor(private restaurantService: RestaurantService) {
    this.restaurants = new Array();
    this.cuisineList = new Array();
    this.cuisineSet = new Set();
    this.initFilters();
  }

  ngOnInit() {
    this.getRestaurants();
  }

  initFilters() {
    this.filters = {};
    this.filters.name = this.restaurantName;
    this.filters.cuisinesList = this.getSelectedCuisines();
  }

  getRestaurants(): void {
    this.dataFetched = false;
    /*
      Fetching restaurant data (csv file) from the restaurantService class
     */
    this.initFilters();
    this.restaurantService.getRestaurants(this.filters, this.page, this.itemsPerPage, this.sortProperty).subscribe(data => {
      this.dataFetched = true;
      const restaurantsList = data.content;
      this.totalPages = data.totalPages;
      this.restaurants = [];
      restaurantsList.forEach(el => {
        const restaurant: Restaurant = this.setRestaurant(el);
        this.restaurants.push(restaurant);
      });

      if (this.cuisineList.length === 0) {
        /*
          convert set to array to display the cuisine list in filters section
        */
        this.cuisineSet.forEach((value: string, key: string) => {
          this.cuisineList.push({ 'name': value, 'checked': false });
        });
      }
    }, error => {
      console.log(error);
      this.dataFetched = true;
    });
  }

  storeSearchedName() {
    this.nameBeforePressingBack = this.restaurantName;
  }
  searchRestaurants(event) {
    if (event.keyCode === 13 || (this.nameBeforePressingBack.length > 0 && this.restaurantName.length === 0 && event.keyCode === 8)) {
      this.getRestaurants();
    }
  }

  private setRestaurant(el): Restaurant {
    var restaurant = new Restaurant();
    restaurant.setName(el['name']);
    restaurant.setCity(el['city']);
    let c = '';
    for (let cuisine of el['cuisines']) {
      cuisine = cuisine.trim();
      if (cuisine !== '') {
        this.cuisineSet.add(cuisine);
        c = c + cuisine + ' | ';
      }
    }
    restaurant.setCuisine(c.substring(0, c.length - 2));
    restaurant.setRanking(el['ranking']);
    restaurant.setRating(el['rating']);
    restaurant.setReviews(el['noOfReviews']);
    const rand = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    restaurant.setImgUrl('assets/img/' + rand + '.jpg');
    return restaurant;
  }

  /* returns the selected(filtered) cuisines from the list of cuisines */
  private getSelectedCuisines(): any[] {
    return this.cuisineList.filter((item) => item.checked) || [];
  }

  public showFilters(): void {
    document.getElementById('filter-overlay').style.display = 'block';
  }

  public applyFilters(): void {
    this.hideFilters();
    this.getRestaurants();
  }

  public hideFilters(): void {
    document.getElementById('filter-overlay').style.display = 'none';
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getRestaurants();
    }
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.getRestaurants();
    }
  }

  /* Clear all filters */
  public clearFilters(): void {
    this.cuisineList.forEach((item) => {
      item.checked = false;
    });
    this.restaurantName = '';
    this.sortProperty = '';
    this.getRestaurants();
  }
}
