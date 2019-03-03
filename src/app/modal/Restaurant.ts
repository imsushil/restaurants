export class Restaurant {
    private name: String;
    private city: String;
    private cuisine: String;
    private ranking: number;
    private rating: number;
    private reviews: number;
    private imgUrl: String;

    public getImgUrl(): String {
        return this.imgUrl;
    }

    public setImgUrl(imgUrl: String): void {
        this.imgUrl = imgUrl;
    }

    public getName(): String {
        return this.name;
    }

    public setName(name: String): void {
        this.name = name;
    }

    public getCity(): String {
        return this.city;
    }

    public setCity(city: String ): void {
        this.city = city;
    }

    public getCuisine(): String {
        return this.cuisine;
    }

    public setCuisine(cuisine: String): void {
        this.cuisine = cuisine;
    }

    public getRanking(): number {
        return this.ranking;
    }

    public setRanking(ranking: number): void {
        this.ranking = ranking;
    }

    public getRating(): number {
        return this.rating;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }

    public getReviews(): number {
        return this.reviews;
    }

    public setReviews(reviews: number): void {
        this.reviews = reviews;
    }


}