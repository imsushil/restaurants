import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchCuisine'})
export class SearchInCuisinePipe implements PipeTransform {

    transform(cuisineList : any, cuisineName: string): any[] {
        if(cuisineName) {
            return cuisineList.filter((listing: any) => listing.name.toLowerCase().includes(cuisineName));
        } else{
            return cuisineList;
        }
    }
}