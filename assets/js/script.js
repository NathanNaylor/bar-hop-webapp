//Variables to store data retrieved
var barId;
var breweryName;
var breweryType;
var street;
var postalCode;
var country;
var phone;
var websiteUrl;
//Var of user input to store zip code
var zipCodeInput;
var typeInput;
var data;
// zip code search: #zip-code
// search button: #search-button
var zipCodeFromTextBoxID = "#zip-code";
var searchButtonID = "#search-button";

var favArray = []
var routeArray = []
getFavLocalStorage();
getRouteLocalStorage();

if (favArray === null) {
    var favArray = []
}
if (routeArray === null) {
    var routeArray = []
}
console.log(favArray, routeArray);



//===================== Functions =======================================
// get Input from text box on Search click
function getZipCodeInput(zipCodeFromText) {
    var zipCodeInput = $(zipCodeFromText).val().trim();
    console.log(zipCodeInput); // Works
    return zipCodeInput;
}



//Search by zip code only
function getBreweryDataUsingZip(zipCodeSearch) {
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch,
        method: "GET"
    }).then(function(response) {

        //Create a card for each reutrned bar
        for (var i = 0; i < response.length; i++) {

            //Saving ajax data in each variable
            websiteUrl = response[i].website_url
            breweryName = response[i].name
            breweryType = response[i].brewery_type
            street = response[i].street
            phone = response[i].phone
            barId = response[i].id

            //Creating card elements and giving them their proper style
            var cell = $("<div>")
            cell.addClass("cell medium-12 large-6")

            var card = $("<div>")
            card.addClass("card")

            var cardDividerButtons = $("<div>")
            cardDividerButtons.addClass("card-divider align-center")

            var cardDivider = $("<div>")
            cardDivider.addClass("card-divider color wood")

            var cardSection = $("<div>")
            cardSection.addClass("card-section")


           //Creating route button and adding all of its attributes
           var routeButton = $("<button>")
           routeButton.addClass("button route-button")
           routeButton.attr({ id: "route-button", barid: barId })
           routeButton.attr("barid", barId)


           //Setting route button text
           routeButton.text("Add To Route")


           //Creating route button and adding all of its attributes
           var favoritesButton = $("<button>")
           favoritesButton.addClass("button favorites-button")
           favoritesButton.attr({ id: "favorites-button", barid: barId })

           //Setting favorites button text
           favoritesButton.text("Add To Favs")


            //Appending buttons to card
            cardDividerButtons.append(favoritesButton)
            cardDividerButtons.append(routeButton)

            //Append the following data to the card
            cardSection.append("<h5><b>Bar Name:</b> </h5><a target='_blank' href='" + websiteUrl + "'> <h5>" + breweryName + "</h5></a>")
            cardSection.append("<h5><b>Bar Type:</b> " + breweryType + "</h5>")
            cardSection.append("<h5><b>Bar Address:</b> " + street + "</h5>")
            cardSection.append("<h5><b>Phone #:</b> " + phone + "</h5>")


            //Appending card proper location
            card.append(cardDivider)
            card.append(cardSection)
            card.append(cardDividerButtons)

            cell.append(card)
            $("#append-card").append(cell)

        }
        $(document).on("click", "#favorites-button", function() {
            var favBarId = $(this)[0].attributes[2].value;
            if (favArray.indexOf(favBarId) < 0) {
                favArray.push(favBarId);
                saveLocalStorage(favArray, "favArray");
                getFavLocalStorage();
                $(this).text("Added to Favs ✓")
            };
        })
        $(document).on("click", "#route-button", function() {
            var favBarId = $(this)[0].attributes[2].value;
            if (routeArray.indexOf(favBarId) < 0) {
                routeArray.push(favBarId);
                saveLocalStorage(routeArray, "routeArray");
                getRouteLocalStorage();
                $(this).text("Added to Route ✓")
            };

        })
    })
}

function getFavLocalStorage() {
    favArray = JSON.parse(localStorage.getItem("favArray"));
}

function getRouteLocalStorage() {
    routeArray = JSON.parse(localStorage.getItem("routeArray"));
}

function saveLocalStorage(arr, arrayNum) {
    localStorage.setItem(arrayNum, JSON.stringify(arr));
}
//Search by zip code and type
function getBreweryDataUsingZipAndType(zipCodeSearch, type) {
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch + "&by_type=" + type,
        method: "GET"
    }).then(function(response) {
        //Create a card for each reutrned bar
        console.log(response);
        for (var i = 0; i < response.length; i++) {

            //Saving ajax data in each variable
            websiteUrl = response[i].website_url
            breweryName = response[i].name
            breweryType = response[i].brewery_type
            street = response[i].street
            phone = response[i].phone
            barId = response[i].id

            //Creating card elements and giving them their proper style
            var cell = $("<div>")
            cell.addClass("cell medium-12 large-6")

            var card = $("<div>")
            card.addClass("card ")

            var cardDividerButtons = $("<div>")
            cardDividerButtons.addClass("card-divider align-center")

            var cardDivider = $("<div>")
            cardDivider.addClass("card-divider color wood")

            var cardSection = $("<div>")
            cardSection.addClass("card-section")


            //Creating route button and adding all of its attributes
            var routeButton = $("<button>")
            routeButton.addClass("button route-button")
            routeButton.attr({ id: "route-button", barid: barId })
            routeButton.attr("barid", barId)


            //Setting route button text
            routeButton.text("Add To Route")


            //Creating route button and adding all of its attributes
            var favoritesButton = $("<button>")
            favoritesButton.addClass("button favorites-button")
            favoritesButton.attr({ id: "favorites-button", barid: barId })

            //Setting favorites button text
            favoritesButton.text("Add To Favs")


            //Appending buttons to card
            cardDividerButtons.append(favoritesButton)
            cardDividerButtons.append(routeButton)


            //Append the following data to the card
            cardSection.append("<h5><b>Bar Name:</b> </h5><a target='_blank' href='" + websiteUrl + "'> <h5>" + breweryName + "</h5></a>")
            cardSection.append("<h5><b>Bar Type:</b> " + breweryType + "</h5>")
            cardSection.append("<h5><b>Bar Address:</b> " + street + "</h5>")
            cardSection.append("<h5><b>Phone #:<b>" + phone + "</h5>")


            //Appending card proper location
            card.append(cardDivider)
            card.append(cardSection)
            card.append(cardDividerButtons)

            cell.append(card)
            $("#append-card").append(cell)

        }
        $(document).on("click", "#favorites-button", function() {
            var favBarId = $(this)[0].attributes[2].value;
            if (favArray.indexOf(favBarId) < 0) {
                favArray.push(favBarId);
                saveLocalStorage(favArray, "favArray");
                getFavLocalStorage();
            };
        })
        $(document).on("click", "#route-button", function() {
            var favBarId = $(this)[0].attributes[2].value;
            if (routeArray.indexOf(favBarId) < 0) {
                routeArray.push(favBarId);
                saveLocalStorage(routeArray, "routeArray");
                getRouteLocalStorage();
            };

        })
    })
}


// ========================= Events ============================
// Event when search button is pressed
$("#search-button").on("click", function() {
    $("#append-card").empty();
    zipCodeInput = getZipCodeInput("#zip-code");
    typeInput = $("#bar-type").val();
    console.log(typeInput);
    if (typeInput === "all") {
        data = getBreweryDataUsingZip(zipCodeInput);
    } else {
        data = getBreweryDataUsingZipAndType(zipCodeInput, typeInput);
    }

})
