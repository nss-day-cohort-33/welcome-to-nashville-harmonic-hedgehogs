//when the search button is clicked, do the following
let searchInput = document.querySelector("#parks-search")//get a handle to access the text input field
console.log('search input', searchInput)

document.querySelector("#parks-button").addEventListener("click", () => {
    parkSearch(searchInput.value)
    console.log('click input', searchInput.value)
});
//this targets where on the DOM to push the data to and have it keep adding 
function parksToDom(parksinfo, element) {
    document.querySelector(`#parks-results`).innerHTML += parksinfo
}
//this function allows the data from the API to show on the DOM

let uniqueParkNameId = 0
let uniqueParkLocId = 0
let uniqueButtonId = 0

//this is the call function to API 
function parkSearch(input) {
    console.log('parksearch', input)
    fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?${input}=Yes`)
        //can't get token to work &$$app_token=${app_keys[0].app_token}
        //Look for the data using the input provided by the User
        .then(data => data.json())
        //Take the promise object returned by the fetch statement and convert it to a promise object 
        .then(parksResults => {
            parksResults.forEach(park => {

                document.querySelector("#parks-results").innerHTML = ""
            })
            console.log('parkresults1', parksResults)
            for (let i = 0; i <= 10; i++) {
                uniqueButtonId++
                uniqueParkNameId++
                uniqueParkLocId++
                //this pushes the loop of the search into the DOM
                parksToDom(parksHTMLLayout(parksResults[i]))
            }
        })
}
// console.log(parksToDom())
// Function for organizing dynamic cards 

// document.querySelector(`#parks-results-button`).addEventListener("click",
// parkSearch(info))
let resultField = document.getElementById("parks-results")

resultField.addEventListener("click", () => {
    if (event.target.id.includes("parks-button-results-")) {
        console.log("Event ID before split", event.target.id)
        let buttonIdArray = event.target.id.split("-")
        console.log("Event ID after split", buttonIdArray)
        let parksElement = document.getElementById('parksName-${buttonIdArray[3]')=textcontent
        putMyParkIntoTheItinerary(parksElement)
    }
})

function parksHTMLLayout(parksObj) {
    return `
        <h2 id = parksName-${uniqueParkNameId}>${parksObj.park_name}</h2>
        <h4 id = parkLoc-${uniqueParkLocId}>${parksObj.mapped_location_address}</h4>
    
        <button id="parks-button-results-${uniqueButtonId}">I'm Going!</button>
    
        </figure>`
}



function putMyParkIntoTheItinerary(parkElement) {
    document.getElementById("parks-itinerary").innerHTML = parkElement;
}