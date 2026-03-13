class Listing {
    constructor(listingID, listingTitle, listingDescription, listingPrice, categoryType) {
        this.listingID = listingID;
        this.listingTitle = listingTitle;
        this.listingDescription = listingDescription;
        this.listingPrice = listingPrice;
        this.categoryType = categoryType;
    }

    getListingDetails() {
        return `ID: ${this.listingID}, Title: ${this.listingTitle}, Price: ${this.listingPrice}`;
    }
}
