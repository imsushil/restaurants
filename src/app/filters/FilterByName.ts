import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filterByName'})
export class FilterByNamePipe implements PipeTransform {

    transform(restaurants : any, restaurantName: string): any[] {
        if(restaurantName) {
            return restaurants.filter((listing: any) => listing.name.toLowerCase().includes(restaurantName));
        } else{
            return restaurants;
        }
    }
}