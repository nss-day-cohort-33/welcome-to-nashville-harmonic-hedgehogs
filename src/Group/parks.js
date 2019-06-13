//when the search button is clicked, do the following
let searchInput = document.querySelector("#parks-search")//get a handle to access the text input field
console.log('search input', searchInput)

document.querySelector("#parks-button").addEventListener("click", () => {
    parkSearch(searchInput.value)
    console.log('click input', searchInput.value)
});
//this targets where on the DOM to push the data to and have it keep adding 
function parksToDom(parksinfo, element) {
<<<<<<< HEAD
    document.querySelector(`#results`).innerHTML += parksinfo
=======
    document.querySelector("#results").innerHTML += parksinfo
>>>>>>> master
}
//this function allows the data from the API to show on the DOM in HTML format

function parksHTMLLayout(parksObj) {
    num++
    return `
    <figure id="card-${num}">
    <h3>Park Name: ${parksObj.park_name}</h3>
    <h4>Park Address: ${parksObj.mapped_location_address}</h4>

    <button id="add-${num}">I'm Going!</button>
    <button class ="hide" id="remove-${num}">Changed my Mind</button>

    </figure>`
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
                
                document.querySelector("#results").innerHTML = ""
            })
            console.log('parkresults1', parksResults)
            for (let i = 0; i <= 10; i++) {
                //this pushes the loop of the search into the DOM
                parksToDom(parksHTMLLayout(parksResults[i]))
            }
        })
}
// console.log(parksToDom())
// Function for organizing dynamic cards 

// document.querySelector(`#results-button`).addEventListener("click",
// parkSearch(info))


    // Function for organizing dynamic cards 
function resultElementHandler1 () {
    const targetButtonIdName = event.target.id.split("-")[0]
    const targetButtonIdNumber = event.target.id.split("-")[1]
    console.log(event.target.id)

    // Variables for dynamically created ID's for target buttons
    const card = document.getElementById(`card-${targetButtonIdNumber}`)
    const addButton = document.getElementById(`add-${targetButtonIdNumber}`)
    const removeButton = document.getElementById(`remove-${targetButtonIdNumber}`)

    // If button ID contains "add", clear itinerary div, append card, and show removeButton/hide addButton 
    if (targetButtonIdName === "add") {
        console.log(targetButtonIdName) 
        // document.querySelector("#parks-itinerary").innerHTML = ""
        console.log(card)   
        document.querySelector("#parks-itinerary").appendChild(card)
        addButton.classList.add("hide")
        removeButton.classList.remove("hide")

        // If button ID contains "remove", append card to top of results div and hide removeButton/show addButton   
    } else if (targetButtonIdName === "remove") {
        document.querySelector(`#results`).prepend(card)
        addButton.classList.remove("hide")
        removeButton.classList.add("hide")
    }
}
// Event listeners for dynamic add/remove buttons
document.querySelector("#results").addEventListener("click", resultElementHandler1)
document.querySelector("#parks-itinerary").addEventListener("click", resultElementHandler1)

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
