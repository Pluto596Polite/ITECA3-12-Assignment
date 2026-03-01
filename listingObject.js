const listingObject = {
    title: "",
    description: "",
    price: 0,
    image: ""
}


const listingArray = [];


function createListingObject() {
//the following will be used to read and retrieve the values from the HTML components

    //here is the form element that will retrieve the values from the HTML file
    const listingForm = document.getElementById("listingForm");
    const submitButton = document.getElementById("submitListing");

    if (listingForm && submitButton) {
        //the following code will be used to listen for when the submit button is clicked
        submitButton.addEventListener("click", function (event) {
            //prevent the page from reloading when the button is clicked
            event.preventDefault();

            //when the button is clicked, the function will retrieve the values from the input fields and use them to create a new object
            const newListing = {
                title: document.getElementById("titleInput").value,
                description: document.getElementById("descriptionInput").value,
                price: document.getElementById("priceInput").value,
                image: document.getElementById("imageInput").value
            }

            //the new object will then be added to the listingArray
            listingArray.push(newListing);

            console.log(listingArray);

            //the following code will be used to log the listingArray to the console to verify that the new object has been added
            alert("New listing was successfully created");
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createListingObject();
});
