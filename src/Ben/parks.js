//when the search button is clicked, do the following
let searchInput = document.querySelector("#parks-search")//get a handle to access the text input field
console.log('search input', searchInput)

document.querySelector("#parks-button").addEventListener("click", () => {
    parkSearch(searchInput.value)
    console.log('click input', searchInput.value)
});
//this targets where on the DOM to push the data to and have it keep adding rather
function parksToDom (parksinfo, element) {
    document.querySelector(`${element}`).innerHTML += parksinfo
}
//this function allows the data from the API to show on the DOM
function parksHTMLLayout (parksObj) {
    return `
    <h2>${parksObj.park_name}</h2>
    <h4>${parksObj.mapped_location_address}</h4>
    <button id="parks-going-button">I'm Going!</button>
    `
}
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
            console.log(park)
            document.querySelector("#results").innerHTML = ""
        })        
        console.log('parkresults1', parksResults)
        for (let i = 0; i <= 10; i++) {
            //this pushes the loop of the search into the DOM
            parksToDom(parksHTMLLayout(parksResults[i]), "#results")    
        }
    })
}

//Take the promise object containing the JSON data and feed it to the function
// document.querySelector("results").innerHTML = ""
// parksToDom()



// //this function pushes
// function createParkSearchComponent(parkObj) {
//     return`
//     <h2>${parkobj.park_name}</h2>
//     <h3>${parkobj.mapped_location.human.address}
//     `
// }
// // console.log(createParkSearchComponent())

// function parksToDom (element, park) {
//     document.querySelector(`#${element}`).innerHTML += park
// }

// function getNashParks(key) { 
//     return fetch(`https://data.nashville.gov/resource/xbru-cfzi.json${searchpInput.value}`)
//         .then(data => data.json())

//         function getParksAPI(parksArr) {
//             parksArr.forEach(nashParks => {
//                 getNashParks(nashParks)
//                 .then(parksResults => {
//                      if (searchInput === yes)
//                 })
//             })
//         }
//     }
// // console.table(getNashParks(parksResults[0]))
