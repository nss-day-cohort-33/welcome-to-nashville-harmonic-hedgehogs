const concertsInput = document.querySelector("#concerts-search")
const concertsButton = document.querySelector("#concerts-button")

concertsButton.addEventListener("click", () => {
    console.log(concertsButton.value)
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=343&keyword=${concertsInput.value}&apikey=${app_keys[3].app_key}`)
        .then(response => response.json())
        .then(concertData => {
           
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

let num = 0;

function createConcertResults(concertObject) {
    num++
    return `
    <article id="card-${num}">
        <h3>${concertObject.name}</h3>
        <img src="${concertObject.images[0].url}" width= "250px">
        <p>${concertObject.dates.start.localDate}</p>
        <p>${concertObject._embedded.venues[0].name}</p>
         
        <button id="add-${num}">add</button>
        <button class="hide" id="remove-${num}">remove</button>
        
    </article>
    `
}

function printConcertResultsToDom (concert) {
    document.querySelector("#concert-results").innerHTML += createConcertResults(concert)
}

function resultElementHandler () {
    console.log(event.target.id)
    const targetButtonIdName = event.target.id.split("-")[0]
    const targetButtonIdNumber = event.target.id.split("-")[1]

    const card = document.getElementById(`card-${targetButtonIdNumber}`)
    const addButton = document.getElementById(`add-${targetButtonIdNumber}`)
    const removeButton = document.getElementById(`remove-${targetButtonIdNumber}`)
    
    if (targetButtonIdName === "add") {
        console.log(card)
        document.querySelector("#concert-itinerary").innerHTML = ""
        document.querySelector("#concert-itinerary").appendChild(card)
        addButton.classList.add("hide") 
        removeButton.classList.remove("hide") 
        
       
    } else if (targetButtonIdName === "remove") {
        document.querySelector("#concert-results").prepend(card)
        addButton.classList.remove("hide")
        removeButton.classList.add("hide") 
    }

}

document.querySelector("#concert-results").addEventListener("click", resultElementHandler)
document.querySelector("#concert-itinerary").addEventListener("click", resultElementHandler)
