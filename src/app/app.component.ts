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
    this.restaurantService.getRestaurants(this.page, this.itemsPerPage, this.sortProperty).subscribe(data => {
      this.dataFetched = true;
      const restaurantsList = data.content;
      console.log(data);
      this.totalPages = data.totalPages;
      this.restaurants = [];
      restaurantsList.forEach(el => {
        const restaurant: Restaurant = this.setRestaurant(el);
        this.restaurants.push(restaurant);
      });

      /*
        convert set to array to display the cuisine list in filters section
       */
      this.cuisineSet.forEach((value: string, key: string) => {
        this.cuisineList.push({ 'name': value, 'checked': false });
      });
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.dataFetched = true;
    });
  }


  getRestaurantsByNameAndCuisines() {
    // tslint:disable-next-line: max-line-length
    this.restaurantService.getRestaurantsByNameAndCuisines(this.restaurantName, this.getSelectedCuisines(), this.page, this.itemsPerPage, this.sortProperty).subscribe(data => {
      const restaurantsList = data.content;
      console.log(data);
      this.totalPages = data.totalPages;
      this.restaurants = [];
      restaurantsList.forEach(el => {
        const restaurant: Restaurant = this.setRestaurant(el);
        this.restaurants.push(restaurant);
      });
    });
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
    return this.cuisineList.filter((item) => item.checked);
  }

  /* Clear all filters */
  public clearFilters(): void {
    // clear filter on cuisine
    this.cuisineList.forEach((item) => {
      item.checked = false;
    });
    this.getRestaurants();
  }

  public showFilters(): void {
    document.getElementById('filter-overlay').style.display = 'block';
  }

  public applyFilters(): void {
    this.hideFilters();
    this.getRestaurantsByNameAndCuisines();
  }

  public hideFilters(): void {
    document.getElementById('filter-overlay').style.display = 'none';
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchRestaurants();
    }
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.fetchRestaurants();
    }
  }

  fetchRestaurants() {
    if (this.restaurantName !== '' || this.getSelectedCuisines().length > 0) {
      this.getRestaurantsByNameAndCuisines();
    } else {
      this.getRestaurants();
    }
  }

  applyFilter() {
    if (this.restaurantName) {
      this.getRestaurantsByNameAndCuisines();
    }
  }
}
