// var initializations
var lang;
var allCards; //reply from the query for the cards
var allSets; //reply from the query for the sets
var thisSet; // Cards for the searched set
var sets=false; //show true for load more sets button
var currentCards; // cards filtered by x format
var ygoorgCard; //query from yugiohorganization
var query;
var filteredQueryResults;
var titlesSection = document.getElementById("titlesSection")
var cardsSection = document.getElementById("cardsSection")
var resultsPerPage = 24
var printedResults = 20
var scrollingValue = 6000; //distance where buttons will show


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

// async function queryYGOPD() {
function queryYGOPD() {
    // https://db.ygoprodeck.com/api/v7/cardinfo.php
    const response = fetch(
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes&sort=new"
        )
        .then((response) => response.json())
        .then((data) => {
            allCards = data;
            currentCards = allCards.data
            // console.log(allCards.data); // show all cards
            // // .replaceAll('. ', '.\n');  ACAAAAA
            // for (let i = 0; i < allCards.data.length; i++) { 
            //     allCards.data[i].desc.replaceAll('. ', '.\n'); 
            // }
            console.log('all cards from YGOPD fetched 😎')
            searchCardNamesForAutocomplete()
            printCards(resultsPerPage, currentCards, text_NewestCards)

        })

        .catch((error) => {
            console.log("ups 😢 " + error);
            return;
            // Code for handling the error
        });
}

// SEARCH ALL SETS FROM YGOPD
function searchAllSets(value) {

    const response = fetch(
            "https://db.ygoprodeck.com/api/v7/cardsets.php"
        )
        .then((response) => response.json())
        .then((data) => {
            allSets = data;
            resetCurrentCards()
            currentCards = allSets
            console.log('all sets fetched 😎')
            // console.log(allSets)
            printSets(30, allSets, text_CardResults)

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
            console.log('data from YGOrg fetched 😎')
        })

        .catch((error) => {
            console.log("ups 😢 " + error);
            return;
            // Code for handling the error
        });
}
// #######################################################################

// RESET CURRENT CARDS
function resetCurrentCards() {
    currentCards = undefined
}

// SORTERS


function sortBy(property) { //"property" can be any value from allCards.data
    //to use you have to write "allCards.data.sort(sortBy("property"))"
    //if you want to reverse sort just use - before the property
    //i.e. "allCards.data.sort(sortBy("-property"))"
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function sortCards(value) {
    resetCurrentCards()
    currentCards = allCards.data.sort(sortBy(`${value}`))
}



// #######################################################################

// SEARCHERS

function searchCardsByNameOrDescription(value) {
    // PASAR TODO A MAYUSCULA O MINUSCULA Y LUEGO BUSCAR 
    resetCurrentCards()
    query = value.toLowerCase();
    currentCards = allCards.data.filter((card) =>
        `${card.name.toLowerCase()} ${card.desc.toLowerCase()}`.includes(query));
    console.log("Results: " + currentCards.length + " cards")
    // console.log(filteredQueryResults);
    // if (filteredQueryResults.length < 30 ){

    printCards(currentCards.length, currentCards, text_CardResults)
    // }
}


function searchByExactValue(field, value) {

    resetCurrentCards()
    currentCards = allCards.data.filter((card) => card[field] === value)
    // console.log(filteredCards)
}

// SEARCH BY SOME VALUE, FOR EXAMPLE
// searchByExactValue("archetype", "Branded") 
// WILL SEARCH "ARCHETYPES" THAT ARE EQUAL TO "BRANDED"

function searchByArchetype(value) {

    resetCurrentCards()
    searchByExactValue("archetype", value)
    printCards(currentCards.length, currentCards, text_Archetype)

}

// FIND BY SET 

function searchBySet(set_name) {
    let thisSet = []

    for (let i = 0; i < allCards.data.length; i++) {

        if (allCards.data[i].card_sets) {
            for (let b = 0; b < allCards.data[i].card_sets.length; b++) {
                if (allCards.data[i].card_sets[b].set_name == set_name) {
                    thisSet.push(allCards.data[i])

                }
            }
        }


    }

    printCards(resultsPerPage, thisSet, text_SetResults)


    resetCurrentCards()
    currentCards = thisSet

}

// FIND BY FORMATT 

function searchByFormat(format) {
    let thisFormat = []

    for (let i = 0; i < allCards.data.length; i++) {
        if (allCards.data[i].misc_info[0].formats) {
            for (let b = 0; b < allCards.data[i].misc_info[0].formats.length; b++) {
                if (allCards.data[i].misc_info[0].formats[b] == format) {
                    thisFormat.push(allCards.data[i])
                }
            }
        }


    }

    printCards(resultsPerPage, thisFormat, text_SetResults)


    resetCurrentCards()
    currentCards = thisFormat

}

// function searchBySet(card, set) {
//     console.log("searching set... " + set)
//     if (card.card_sets) {
//         const findBySet = (id) => allCards.data
//             .filter(x => x.id === id || x.set_name.some(set => id === set.id))
//             .map(y => ({
//                 ...y,
//                 children: y.set_name.filter(set => id === set.id)
//             }))

//         console.log(findBySet(set))
//     }
// }




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

function printCards(howMany, cards, title) {

    resetCurrentCards()
    currentCards = cards
    cardsSection.innerHTML = ("")

    titlesSection.innerHTML = title + "<span class='greenText'>" + howMany + " </span> cards"
    // console.log(cards2print)

    for (let i = 0; i < (howMany); i++) {
        try {
            if (howMany < 7) {
                createNormalCard(currentCards[i], "aloneCard")
            } else {
                createNormalCard(currentCards[i])
            }
        } catch (error) {
            console.error(error);
        }
    }


}

function printSets(howMany, sets, title) {
    cardsSection.innerHTML = ("")
    let cards2print = []
    cards2print = sets

    titlesSection.innerHTML = title + "<span class='greenText'>" + howMany + " </span> cards"
    // console.log(cards2print)

    for (let i = 0; i <= howMany; i++) {
        cards2print.push(sets[i])
        try {
            createSet(cards2print[i])
        } catch (error) {
            console.error(error);
        }
    }


}


// #######################################################################

// WRITE TITLE

function writeTitle(title, howmany) {
    titlesSection.innerHTML = title

}


function changeResolution(id) {
        // alert("Your screen resolution is: " + window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio);
        var width = window.screen.width
        var height = window.screen.height
        // console.log(width+"px width and "+ height + "px height")

        // MOVE:
        // jQuery("#NodesToMove").detach().appendTo('#DestinationContainerNode')
        // COPY:
        // jQuery("#NodesToMove").appendTo('#DestinationContainerNode')
        jQuery( `#cardName_${id}`).detach().appendTo( `#cardHeader_${id}`)
        jQuery( `#cardSubTitle_${id}`).detach().appendTo( `#cardHeader_${id}`)
        
}


// #######################################################################

// MORE RESULTS

function printMoreResults(howMany) {

    // AGREGAR VERIFICACION CON URL, CUANDO SEA /SETS sets=true
    if (sets == true) {
        for (let i = printedResults; i < (printedResults + howMany); i++) {

            try {
                createSet(currentCards[i])
            } catch (error) {
                // console.error(error);
                alert("No more cards!")
                return
            }


        }


    } else {

            for (let i = printedResults; i < (printedResults + howMany); i++) {

                try {
                    createNormalCard(currentCards[i])
                } catch (error) {
                    // console.error(error);
                    alert("No more cards!")
                    return
                }


            }

    }
    printedResults = printedResults + howMany
}


// LOAD MORE CARDS BUTTON


var moreCardsbtn = $('#loadMoreCards');


$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        moreCardsbtn.addClass('show');
    } else {
        moreCardsbtn.removeClass('show');
    }
});


// BACK TO TOP BUTTON

var btn = $('#back2top');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});

// FOOTER

var footer = $('#footer');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        footer.addClass('show');
    } else {
        footer.removeClass('show');
    }
});