//fetches data from zomato api
function foodFetch(userSearch) {

    // console.log('paramater passed into function---', userSearch)

    return fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${userSearch}&apikey=${app_keys[1].app_key}`, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(r => r.json())
    // .then(result => {
    //     console.log(result.restaurants[6].restaurant.name)
    // })
}


//variable locating where to look for user search
let userInputLocation = document.querySelector("#food-search")


//converts data fetched into html 
let uniqueID = 0

function foodHTML (test, i) {
    // console.log('test', test, 'i', i)
    // console.log('show me below html', test.restaurants[i].restaurant.name)
    return `
    <div id="restaurant-id-${uniqueID}" class="search-style">
    <img src="${test.restaurants[i].restaurant.featured_image}" alt="" width=200px height=auto>
    <h3>${test.restaurants[i].restaurant.name}</h3>
    <h4>${test.restaurants[i].restaurant.location.address}</h4>
    </div>
    <button id="save-button-${uniqueID}">Eat Here!</button>
    `

}


function foodHTMLToDom (infoHTML, element) {
    document.querySelector(`${element}`).innerHTML += infoHTML
}


// console.log('user input location---', userInputLocation)


//this makes the button clickable and print the first 10 results
document.querySelector("#food-button").addEventListener("click", () => {
    fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${userInputLocation.value}&apikey=${app_keys[1].app_key}`, {
        headers: {
            "Accept": "application/json"
        }
    })
    .then( restData => restData.json())
    .then( rest => {
        
        document.querySelector("#results").innerHTML = ""
        
        //Loop through and pull name and address of first 10 results from search
        for(let i=0; i < 10; i++) {
            // console.log('first parameter', foodHTML(rest), 'i', i)
            uniqueID++
            foodHTMLToDom(foodHTML( rest, i ), "#results")

            
            
            // console.log(rest.restaurants[i].restaurant.name)
            // console.log(rest.restaurants[i].restaurant.location.address)
        }
        
        

        // console.log(rest)
        // console.log('list of restaurants - ', rest.restaurants)
        // console.log('list first index of restaurants - ',rest.restaurants[0])
        // console.log('list of first object in index of restaurants - ', rest.restaurants[0].restaurant)
        // console.log('list the name of the restaurant - ', rest.restaurants[0].restaurant.name)
    })
})


document.querySelector("#results").addEventListener("click", () => {
    if(event.target.id.includes("save-button")) {
        console.log(event)
        let buttonID = event.target.id.split("-")[2]
        let matchedRest = document.querySelector(`#restaurant-id-${buttonID}`)
        console.log(matchedRest)
        document.querySelector("#food-itinerary").textContent = matchedRest.firstElementChild.nextElementSibling.textContent + " " + matchedRest.firstElementChild.nextElementSibling.nextElementSibling.textContent
    }
})