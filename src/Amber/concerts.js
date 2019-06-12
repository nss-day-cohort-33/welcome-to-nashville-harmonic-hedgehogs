const concertsInput = document.querySelector("#concerts-search")
const concertsButton = document.querySelector("#concerts-button")

// function getConcerts () 
concertsButton.addEventListener("click", () => {
    console.log(concertsButton.value)
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=343&keyword=${concertsInput.value}&apikey=${app_keys[3].app_key}`)
        .then(response => response.json())
        .then(concertData => {
           
            concertData._embedded.events.forEach(concert => {
                console.log(concertData)
                console.log(concert.name)
                console.log(concert.dates.start.localDate)
                console.log(concert.images[0].url)
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



function createConcertResults(concertObject) {
    return `
    <div>
        <h3>${concertObject.name}</h3>
        <img src="${concertObject.images[0].url}">
        <p>${concertObject.dates.start.localDate}</p>
        <p>${concertObject._embedded.venues[0].name}</p>
         <div>
            <button id="save-${num}">Save</button>
        </div>
    </div>
    `
}

function printConcertResultsToDom (concert) {
    document.querySelector("#results").innerHTML += createConcertResults(concert)
}

function saveResultElements () {
    const targetButtonIdNumber = event.target.id.split("-")[1]
    const card = document.getElementById(`card--${targetButton}`)
    div.removeChild(card)
}

// getConcerts()