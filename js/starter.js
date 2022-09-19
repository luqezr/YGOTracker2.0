// var initializations
var lang;
var allCards; //reply from the query to the server
var sortedCards; //cards sorted by X format
var filteredCards; // cards filtered by x format
var ygoorgCard; //query from yugiohorganization
var query;
var filteredQueryResults;
var titlesSection = document.getElementById("titlesSection")
var cardsSection = document.getElementById("cardsSection")

// start webpage
window.onload = startWebPage();

function startWebPage() {
  if (lang == undefined || lang == null) {
    // setting default language to english...
    lang = "en";
    // hacer un query a la db de todas las cartas
  }
  queryYGOPD();
}


// #######################################################################

// DB QUERYS

// Query ALL Yugiohprodeck DB

async function queryYGOPD() {
  // https://db.ygoprodeck.com/api/v7/cardinfo.php
  const response = await fetch(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes&sort=new"
  )
    .then((response) => response.json())
    .then((data) => {
      allCards = data;
      // console.log(allCards.data); // show all cards
      console.log('data fetched 😎')
    })

    .catch((error) => {
      console.log("ups 😢 " + error);
      return;
      // Code for handling the error
    });
}

// Query YgoOrganization

async function queryYGOrg(card) {
  // https://db.ygoprodeck.com/api/v7/cardinfo.php
  await fetch(`https://db.ygorganization.com/data/card/${card}`) //use konami id for this, cards[x].misc_info[0].konami_id
    .then((response) => response.json())
    .then((data) => {
      ygoorgCard = data;
      // console.log(ygoorgCard); // show card
      console.log('data fetched 😎')
    })

    .catch((error) => {
      console.log("ups 😢 " + error);
      return;
      // Code for handling the error
    });
}
// #######################################################################

// SORTERS


function sortBy(property) { //"property" can be any value from allCards.data
  //to use you have to write "allCards.data.sort(sortBy("property"))"
  //if you want to reverse sort just use - before the property
  //i.e. "allCards.data.sort(sortBy("-property"))"
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

function sortCards (value){
  sortedCards = allCards.data.sort(sortBy(`${value}`))
}



// #######################################################################

// SEARCHERS

function searchCardsByNameOrDescription(value) {
  query = value;
  filteredQueryResults = allCards.data.filter((card) =>
    `${card.name} ${card.desc}`.includes(query)
  );
  console.log(filteredQueryResults);
}


function searchByExactValue (field, value)  {       
  filteredCards = allCards.data.filter((card) => card[field] === value)
  console.log(filteredCards)
}


function searchBy (field, value)  {       
  filteredCards = allCards.data.filter((card) => card[field] .includes(value))
  console.log(filteredCards)
}


var searchButton = document.getElementById("send")

searchButton.addEventListener("click", function getCard(evt) {
  evt.preventDefault();
    sortCards("name")
    let cardName = document.search.fname.value;
    // console.log("Searching : "+cardName)
    searchCardsByNameOrDescription(cardName)
    printCards(filteredQueryResults.length)
})



// #######################################################################

// PRINT IN SCREEN

function printCards(howMany, howManyMoreCards){
    let cards2print = []
    
    for (let i = 0; i <= (howMany-1); i++) {  //-1 for it to be the same number as user inputs since the array starts as 0, so if user inputs 9 it will print 10 results, from 0 to 9
      cards2print.push(sortedCards[i])
      console.log(sortedCards[i])

    }
 
}

// CREAR CARTA

function createCard(card){

  console.log(card)

  cardsSection.innerHTML += `
  <div class="card" data-bs-toggle="modal" data-bs-target="#card_${card.id}" > 
  <img src="${card.card_images[0].image_url}" alt="${card.name}">
  </div>

  <div class="modal fade" id="card_${card.id}" tabindex="-1" aria-labelledby="card_${card.id}" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="cardHeader">
            ${card.name}
            <br>
            ${card.id}
            <br>
            ${card.race}
            <br>
            ${card.type}
          </div>
          <div class="cardInfo">
            ${card.desc}
          </div>   
        </div>
      </div>
    </div>   
  </div>

  `



}