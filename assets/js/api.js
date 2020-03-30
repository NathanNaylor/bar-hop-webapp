// =======================================Actual code==============================

//Assign bar's user saved here
var barId = [];

var firstBarLat;
var firstBarLng;

var nextBarLat;
var nextBarLng;

//Marker labels
var markerLabels = "ABCDEFIGHIJKLMNOPQRSTUVWXYZ";
var markerLabelsIndex = 0;
var markers = []

//Data to save
var websiteUrl;
var breweryName;
var breweryType;
var street;
var city;
var zip;
var phone;
var currentId;


//Global variable map is set as
var map;

//Get the barId's for the bars the user saved 
function getBarIds() {
    barId = JSON.parse(localStorage.getItem("routeArray"));
}

getBarIds()

// Make an ajax request for the first id's name lat and lng
$.ajax({

    url: "https://api.openbrewerydb.org/breweries/" + barId[0],
    method: "GET"

}).then(function (result) {

    //Variables to create a card
    websiteUrl = result.website_url;
    breweryName = result.name;
    breweryType = result.brewery_type;
    street = result.street;
    phone = result.phone;
    city = result.city;
    zip = result.postal_code
    currentId = barId[0]

    fullAddress = street + ", " + city + ", " + zip
    

    //Saving lat and lng to firstBar variables
    firstBarLat = parseFloat(result.latitude)
    firstBarLng = parseFloat(result.longitude)

    //Creates a map for using the first bar as the center
    displayMap(firstBarLat, firstBarLng)

    createCard(websiteUrl, breweryName, breweryType, street, phone, currentId)

    //Creating a marker for that first bar
    displayMarker(firstBarLat, firstBarLng, breweryName, fullAddress)


    //Ajax call for lat and lng of the rest if the bars
    for (let i = 1; i < barId.length; i++) {

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
            city = result.city;
            zip = result.postal_code
            currentId = barId[i]
        
            fullAddress = street + ", " + city + ", " + zip

            nextBarLat = parseFloat(result.latitude)
            nextBarLng = parseFloat(result.longitude)

            createCard(websiteUrl, breweryName, breweryType, street, phone, currentId)
            displayMarker(nextBarLat, nextBarLng, breweryName, fullAddress)

        })
        
    }

    console.log(markers)
})

//Creates map based on the first bar saved
function displayMap(lat, lng) {

    //Creates and displays a new map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 11
    });
}

//Displays a marker on each of the  bars saved   
function displayMarker(lat, lng, barName, barAddress) {


    //The location in link format
    var text = "<p>" +barName + "</p>" + "<a href='https://maps.google.com/?q=" + barName + "' target='_blank'>" + barAddress + "</a>"

    //Creates a new marker
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        label: markerLabels.charAt(markerLabelsIndex)
    });

    markers.push(marker)

    //Checks if mareker was clicked
    marker.addListener('click', function() {

        //Will focus on the marker
        map.setZoom(13);
        map.setCenter(marker.getPosition());
        
        //Will create a pop up showing address and name of the bar
        infowindow.open(map, marker);
    });

    var infowindow = new google.maps.InfoWindow({
        content: text
    });

    //Moves onto the next label
    markerLabelsIndex++
}

//Create a card for each brewery
function createCard(websiteUrl, breweryName, breweryType, street, phone, id) {

    var cell = $("<div>")
    cell.addClass("cell medium-12 large-6")

    var card = $("<div>")
    card.addClass("card")

    var removeRouteButton = $("<button>")
    removeRouteButton.addClass("button remove-route-button")
    removeRouteButton.attr("barid", id)  
    removeRouteButton.text("Remove from Route")

    var cardDividerButtons = $("<div>")
    cardDividerButtons.addClass("card-divider align-center")

    var cardSection = $("<div>")
    cardSection.addClass("card-section")

    //Appending buttons to card
    cardDividerButtons.append(removeRouteButton)

    //Append the following data to the card
    cardSection.append("<h5>Bar Name: </h5><a target='_blank' href='" + websiteUrl + "'> <h5>" + breweryName + "</h5></a>")
    cardSection.append("<h5> Bar Type: " + breweryType + "</h5>")
    cardSection.append("<h5> Bar Address: " + street + "</h5>")
    cardSection.append("<h5> Phone #: " + phone + "</h5>")
    cardSection.append("<p>Bar: " + markerLabels.charAt(markerLabelsIndex) + "</p>")

    //Appending card proper location
    card.append(cardSection)
    card.append(cardDividerButtons)

    cell.append(card)

    $("#append-card").append(cell);
}

//Removes bar Id 
$(document).on("click", ".remove-route-button", function(){

    var barToRemove = ($(this)[0].attributes.barid.value)

    var barArrayLocation = barId.indexOf(barToRemove)

    console.log(barArrayLocation)
    barId.splice((barArrayLocation),1)

    localStorage.setItem('routeArray', JSON.stringify(barId));

    //Removes card from html page
    $(this).parent().parent().parent().remove()

    removeMarker(barArrayLocation)
})

function removeMarker(whichMarker){
    markers[whichMarker].setMap(null);
    markers.splice(whichMarker,1)
}