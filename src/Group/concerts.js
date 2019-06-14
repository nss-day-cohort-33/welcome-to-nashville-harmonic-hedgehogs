const concertsInput = document.querySelector("#concerts-search")
const concertsButton = document.querySelector("#concerts-button")

// Event listener for concert search button, pulls in API data and calls print function 
concertsButton.addEventListener("click", () => {
    console.log(concertsButton.value)
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=343&keyword=${concertsInput.value}&apikey=${app_keys[3].app_key}&size=6`)
        .then(response => response.json())
        .then(concertData => {
            document.querySelector("#results").innerHTML = ""
           
            concertData._embedded.events.forEach(concert => {
                // console.log(concertData)
                // console.log(concert.name)
                // console.log(concert.dates.start.localDate)
                // console.log(concert.images[0].url)
                concert._embedded.venues.forEach(venues => {
                    console.log(venues.name)
                    
                })
                
                // for (let i = 0; i < concertData._embedded.events.length; i++) 
                    // console.log(concertData._embedded.events[i]._embedded.venues[i].name)
                    // console.log(concertData._embedded.events[i].name)

                    printConcertResultsToDom(concert)
            })
        })
})

// Creates individual search result cards
let num = 0;
function createConcertResults(concertObject) {
    num++
    return `
    <figure id="card-${num}">
        <img src="${concertObject.images[0].url}">
        <figcaption><h3>${concertObject.name}</h3></figcaption>
        <p>${concertObject.dates.start.localDate}</p>
        <p>${concertObject._embedded.venues[0].name}</p>
        <p><a href=${concertObject.url}>Get tickets</a></p>
         
        <button id="add-${num}">add</button>
        <button class="hide" id="remove-${num}">remove</button>
    </figure>
    `
}

// Prints to DOM
function printConcertResultsToDom (concert) {
    document.querySelector("#results").innerHTML += createConcertResults(concert)
}

// Function for organizing dynamic cards 
function resultElementHandler () {
    console.log(event.target.id)
    const targetButtonIdName = event.target.id.split("-")[0]
    const targetButtonIdNumber = event.target.id.split("-")[1]

    // Variables for dynamically created ID's for target buttons
    const card = document.getElementById(`card-${targetButtonIdNumber}`)
    const addButton = document.getElementById(`add-${targetButtonIdNumber}`)
    const removeButton = document.getElementById(`remove-${targetButtonIdNumber}`)
    
    // If button ID contains "add", clear itinerary div, append card, and show removeButton/hide addButton 
    if (targetButtonIdName === "add") {
        // document.querySelector("#concert-itinerary").innerHTML = ""
        document.querySelector("#concert-itinerary").appendChild(card)
        addButton.classList.add("hide") 
        removeButton.classList.remove("hide") 
        
    // If button ID contains "remove", append card to top of results div and hide removeButton/show addButton   
    } else if (targetButtonIdName === "remove") {
        document.querySelector("#results").prepend(card)
        addButton.classList.remove("hide")
        removeButton.classList.add("hide") 
    }

}
// Event listeners for dynamic add/remove buttons
document.querySelector("#results").addEventListener("click", resultElementHandler)
document.querySelector("#concert-itinerary").addEventListener("click", resultElementHandler)
