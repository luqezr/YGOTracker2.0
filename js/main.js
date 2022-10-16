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
var resultsPerPage = 18

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
      sortedCards = allCards.data
      // console.log(allCards.data); // show all cards
      console.log('data fetched 😎')
      searchCardNamesForAutocomplete()
      printCards(resultsPerPage,allCards.data,title )

    })

    .catch((error) => {
      console.log("ups 😢 " + error);
      return;
      // Code for handling the error
    });
}

// Query YgoOrganization

async function queryYGOrg(card) {
  // API URL = https://db.ygoprodeck.com/api/v7/cardinfo.php
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
  // PASAR TODO A MAYUSCULA O MINUSCULA Y LUEGO BUSCAR 
  query = value.toLowerCase();
  filteredQueryResults = allCards.data.filter((card) =>
    `${card.name.toLowerCase()} ${card.desc.toLowerCase()}`.includes(query)
  );
  console.log("Results: "+ filteredQueryResults.length+" cards")
  // console.log(filteredQueryResults);

  // if (filteredQueryResults.length < 30 ){
    printCards(filteredQueryResults.length, filteredQueryResults, title)
  // }
}


function searchByExactValue (field, value)  {     
  filteredCards = allCards.data.filter((card) => card[field] === value)
  console.log(filteredCards)
}

// SEARCH BY SOME VALUE, FOR EXAMPLE
// searchByExactValue("archetype", "Branded") 
// WILL SEARCH "ARCHETYPES" THAT ARE EQUAL TO "BRANDED"

function searchByArchetype (value) {
  searchByExactValue("archetype", value) 
  printCards(filteredCards.length, filteredCards, title)

}



function searchData(arr, query) {

  let data = [];
  let re = new RegExp(query, 'i');

  for (let item of arr) {
    for (let p in item) {
      if (re.test(item[p]))
        data.push(item[p]);
    }
  }
  return data;
}



// #######################################################################


// SEARCH BAR 
var searchButton = document.getElementById("send")

searchButton.addEventListener("click", function getCard(evt) {
  evt.preventDefault();
    sortCards("name")
    let cardName = document.search.fname.value;
    // console.log("Searching : "+cardName)
    searchCardsByNameOrDescription(cardName)

    
})



// #######################################################################

// PRINT IN SCREEN

function printCards(howMany, cards, title){
    cardsSection.innerHTML=("")
    let cards2print = []
    cards2print = cards

    titlesSection.innerHTML = title + howMany + " cards"
    // console.log(cards2print)

    for (let i = 0; i <= (howMany-1); i++) {  
      cards2print.push(sortedCards[i])
      // console.log(sortedCards[i])
      try {
      createNormalCard(cards2print[i])
        } catch (error) {
          console.error(error);
        }
    }
 
}



// #######################################################################

// WRITE TITLE

function writeTitle(title){
  titlesSection.innerHTML=title

}



// #######################################################################
