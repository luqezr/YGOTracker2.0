// var initializations
var lang;
var allCards;
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
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes"
  )
    .then((response) => response.json())
    .then((data) => {
      allCards = data;
      console.log(allCards.data);
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
      console.log(ygoorgCard);
    })

    .catch((error) => {
      console.log("ups 😢 " + error);
      return;
      // Code for handling the error
    });
}

// SORTERS

function sortBy(value) {
  allCards.data.sort(function (a, b) {
    return a.id - b.id;
  });
}

// SEARCHERS

function searchCardsByNameOrDescription(value) {
  query = value;
  filteredQueryResults = allCards.data.filter((card) =>
    `${card.name} ${card.desc}`.includes(query)
  );
  console.log(filteredQueryResults);
}
