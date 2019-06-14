// event listener for form
let searchInput1 = document.querySelector("#meetups-search")  //get a handle to access the text input field

function createHTMLStringUsingAPIResults (thisObject, fromthissection) {
  if (fromthissection = "meetups") {//For the meetups API
    // letArraytoHold
    let thiswillHoldHTMLforDOM = "";  //Initialize the variable

    for (let i = 0; i < thisObject.events.length && i < 10; i++) {//Maximum number of results--10!
      let nameofItem = thisObject.events[i].name.text;
      let addressofItem = thisObject.events[i].venue.address.address_1;
      if (addressofItem !== null) {//If address is not null...
        thiswillHoldHTMLforDOM += 
          `<figure id="joydivid-${i}">
          <h3>${nameofItem}</h3>
          <h3>${addressofItem}</h3>
          <button id="saveitembutton-${i}">Save This Item</button>
          </figure>`
        }
      else {
        thiswillHoldHTMLforDOM += 
        `<figure id="joydivid-${i}">
        <h3>${nameofItem}</h3>
        <h3>No Address Available</h3>
        <button id="saveitembutton-${i}">Save This Item</button>
        </figure>`
      }    
    }
    return thiswillHoldHTMLforDOM;
  }
}


function AddHTMLResultstoDOM (thisHTMLstring, thislocation) {

  document.querySelector(thislocation).innerHTML = ""; //Clear out the area (from any previous search results)
  document.querySelector(thislocation).innerHTML = thisHTMLstring;

}
function AddtoItineraryDOM(nameofEvent, addressofEvent, thisnewlocation) {

  document.querySelector(thisnewlocation).innerHTML = `<h3>${nameofEvent}</h3><h3>${addressofEvent}</h3>`;

}

//when the search button is clicked, do the following
document.querySelector("#meetups-button").addEventListener("click", () => {
  let apiUrl = "https://www.eventbriteapi.com/v3/events/search/" //The Url provided by the API provider
  let apiToken = app_keys[2].token //Required parameter to obtain the data--generated by the API provider
  fetch(`${apiUrl}?q=${searchInput1.value}&location.address=nashville&location.within=10mi&expand=venue&token=${apiToken}&start_date.keyword=this_week`) //Look for the data using the input provided by the User
  .then( data => data.json()) //Take the promise object returned by the fetch statement and convert it to a promise object containing the data in a JSON format
  .then( meetupInformation => { //Take the promise object containing the JSON data and insert into the DOM
    
  let meetupsHTML = createHTMLStringUsingAPIResults (meetupInformation, "meetups");//

  AddHTMLResultstoDOM(meetupsHTML, "#results");

  //Adding items to the Itinerarybelow..waiting on click first

  document.querySelector("#results").addEventListener("click", (event) => {
    findThisValue = event.target.id.split("-")[1];  //Select which button was clicked and use its "index value"
    let nameofItemtoItinerary = meetupInformation.events[findThisValue].name.text;
    let addressofItemtoItinerary = meetupInformation.events[findThisValue].venue.address.address_1;
    if (addressofItemtoItinerary === null) {
      addressofItemtoItinerary = "No Address Available"
    }

    AddtoItineraryDOM(nameofItemtoItinerary, addressofItemtoItinerary, "#meetups-itinerary")

  })
    
    })
  })
