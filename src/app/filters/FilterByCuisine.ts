import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'filterByCuisine'
})
export class FilterByCuisinePipe implements PipeTransform {
    transform(restaurantList: Array<any>, cuisineList: Array<any>) {
        if(cuisineList.length > 0) {
            return restaurantList.filter((item) => {
                for (let index = 0; index < cuisineList.length; index++) {
                    const element = cuisineList[index].name;
                    if(item.cuisine.includes(element)) {
                        return true;
                    }
                }
                return false;

            });
        } else {
            return restaurantList;
        }
    }
}