// var initializations
var lang;
var allCards;

// start webpage
window.onload = startWebPage();

function startWebPage() {
  if (lang == undefined) {
    // setting default language to english...
    lang = "eng";
    // hacer un query a la db de todas las cartas
  }
  queryYGOPD();
}

async function queryYGOPD() {
  // https://db.ygoprodeck.com/api/v7/cardinfo.php
  const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
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

async function queryYGOrg() {
  // https://db.ygoprodeck.com/api/v7/cardinfo.php
  const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
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
