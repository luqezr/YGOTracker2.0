// var initializations
var lang;
var allCards;
var sortedCards;
var filteredCards;
var ygoorgCard;
var query;
var filteredQueryResults;

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

// Query Yugiohprodeck DB

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
  await fetch(`https://db.ygorganization.com/data/card/${card}`)
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

// SORTERS


function sortBy(property) { //"property" can be any value from allCards.data
  //to use you have to write "allCards.data.sort(sortBy("property"))"
  //if you want to reverse sort just use - before the property
  //i.e. "allCards.data.sort(sortBy("-property"))
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
