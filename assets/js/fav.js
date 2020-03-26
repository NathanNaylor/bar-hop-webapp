//Assign bar's user saved here
var barId = [];

//Get the barId's for the bars the user saved 
function getBarIds() {
    barId = JSON.parse(localStorage.getItem("favArray"));
}


getBarIds()

for (var i = 0; i < barId.length; i++) {

    $.ajax({

        url: "https://api.openbrewerydb.org/breweries/" + barId[i],
        method: "GET"

    }).then(function (result) {

        //variables to create a card
        websiteUrl = result.website_url;
        breweryName = result.name;
        breweryType = result.brewery_type;
        street = result.street;
        phone = result.phone;

        createCard(websiteUrl, breweryName, breweryType, street, phone)

    })
}

//Create a card for each brewery
function createCard(websiteUrl, breweryName, breweryType, street, phone) {

    var card = $("<div>");
    card.addClass("card align-middle color");

    var cardDividerButtons = $("<div>");
    cardDividerButtons.addClass("card-divider color")

    var cardSection = $("<div>");
    cardSection.addClass("card-section");

    //Creating route button and adding all of its attributes
    var routeButton = $("<button>");
    routeButton.addClass("button change-button");
    routeButton.attr({ id: "route-button", barid: barId });

    //Setting route button text
    routeButton.text("Add To Route");

    //Creating route button and adding all of its attributes
    var removeButton = $("<button>");
    removeButton.addClass("button change-button");
    removeButton.attr({ id: "favorites-button", barid: barId });

    //Setting favorites button text
    removeButton.text("Remove");

    //Appending buttons to card
    cardDividerButtons.append(removeButton);
    cardDividerButtons.append(routeButton);

    //Append the following data to the card
    cardSection.append("<h5>Bar Name: </h5><a target='_blank' href='" + websiteUrl + "'> <h5>" + breweryName + "</h5></a>");
    cardSection.append("<h5> Bar Type: " + breweryType + "</h5>");
    cardSection.append("<h5> Bar Address: " + street + "</h5>");
    cardSection.append("<h5> Phone #:" + phone + "</h5>");

    //Appending card proper location
    card.append(cardSection);
    card.append(cardDividerButtons);
    $("#append-card").append(card);
    $("#append-card").append("<br>");

}