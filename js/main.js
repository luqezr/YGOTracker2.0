// var initializations
var lang;
var allCards; //reply from the query for the cards
var allSets; //reply from the query for the sets
var allArchetypes; //reply from the  query all archetypes
var currentCardsFromDeck; //Current cards from deck
var thisSet; // Cards for the searched set
var setsStatus = false; //show true for load more sets button
var deckPricerStatus = false; //modifies searchbar to add cards to deck
var currentCards; // cards filtered by x format
var ygoorgCard; //query from yugiohorganization
var yugiohPricesResult //query from yugiohprices
var query;
var file; //data from current deck file
var filteredQueryResults;
var currentFilteredResults;
var filteredSets;
var filteredArchetypes;
var filteredStaples;
var titlesSection = document.getElementById("titlesSection");
var cardsSection = document.getElementById("cardsSection");
var loaderSection = document.getElementById("loaderSection");
var cardIndex;
var resultsPerPage = 24;
var setsPerPage = 24;
var printedResults = resultsPerPage;
var scrollingValue = 6000; //distance where buttons will show
var deck2download = {
    creator: [],
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
};



// start webpage
$(window).on("load", function() {
    $('html, body').animate({
        scrollTop: 0
    }, '300');
    startWebPage();

});


function startWebPage() {

    if (lang == undefined || lang == null) {
        // setting default language to english...
        lang = "en";
        // hacer un query a la db de todas las cartas
    }
    load(queryYGOPD);



}

async function load(what, parameter1, parameter2) {

    loaderSection.style.display = 'flex';
    await what(parameter1, parameter2)
    $(".loader-wrapper").fadeOut("fast");
}

// #######################################################################

// DB QUERYS

// Query ALL Yugiohprodeck DB

// async function queryYGOPD() {
async function queryYGOPD() {
    // https://db.ygoprodeck.com/api/v7/cardinfo.php
    await fetch(
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
            printCards(resultsPerPage, allCards.data, text_NewestCards1, '', text_NewestCards2)
            printedResults = resultsPerPage

        })

        .catch((error) => {
            console.log("ups 😢 " + error);
            return;
            // Code for handling the error
        });
}

// SEARCH ALL SETS FROM YGOPD
async function searchAllSets(value) {

    await fetch(
            "https://db.ygoprodeck.com/api/v7/cardsets.php"
        )
        .then((response) => response.json())
        .then((data) => {
            allSets = data;
            resetCurrentCards()
            currentCards = allSets
            console.log('all sets fetched 😎')
            // console.log(allSets)
            printSets(setsPerPage, allSets, text_allSets1 + '<span class="greenText">' + allSets.length + '</span>' + text_allSets2)

        })

        .catch((error) => {
            // Code for handling the error
            console.log("ups 😢 " + error);
            return;
        });

}

// SEARCH ALL ARCHETYPES
async function searchAllArchetypes(value) {

    await fetch(
            "https://db.ygoprodeck.com/api/v7/archetypes.php"
        )
        .then((response) => response.json())
        .then((data) => {
            allArchetypes = data;
            resetCurrentCards()
            // currentCards = allArchetypes
            console.log('all archetypes fetched 😎')
            // console.log(allSets)
            printArchetypes(setsPerPage, allArchetypes, text_AllArchetypes1 + '<span class="greenText">' + allArchetypes.length + '</span>' + text_AllArchetypes2)

        })

        .catch((error) => {
            // Code for handling the error
            console.log("ups 😢 " + error);
            return;
        });

}
// Query YgoOrganization

async function queryYGOrg(cardId, konamId, language) {
    // API URL = https://db.ygoprodeck.com/api/v7/cardinfo.php
    await fetch(`https://db.ygorganization.com/data/card/${konamId}`) //use konami id for this, cards[x].misc_info[0].konami_id
        .then((response) => response.json())
        .then((data) => {
            ygoorgCard = data;
            // console.log(ygoorgCard); // show card
            console.log('data from YGOrg fetched 😎')
            // console.log(ygoorgCard)
            changeCardInformation(cardId, language)
        })

        .catch((error) => {
            console.log("ups 😢 " + error);
            alert("No languages for this card yet! 😢")
            return;
            // Code for handling the error
        });
}


function changeCardInformation(cardId, language) {
    let desc = ygoorgCard.cardData[language].effectText
        .replace('.)', '.) <br/>')
        .replace('●', '<br/> ● ')
        .replace('. ● ', '<br/> ● ')
        .replace('<br/> <br/>', '<br/>')

    if (ygoorgCard.cardData[language].pendulumEffectText) {
        document.getElementById(`description_${cardId}`).innerHTML = `${ygoorgCard.cardData[language].pendulumEffectText}<br>${desc}`
    } else {
        document.getElementById(`description_${cardId}`).innerHTML = `${desc}`
    }

    document.getElementById(`name_${cardId}`).innerHTML = `${ygoorgCard.cardData[language].name.toUpperCase()}`

}

// SEARCH PRICES IN YUGIOHPRICES

async function getYgopricesPrice(cardSetCode, cardId) {
    await fetch(
            `http://yugiohprices.com/api/price_for_print_tag/${cardSetCode}`
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // let response = data;
            yugiohPricesResult = data
            // console.log(allCards.data); // show all cards
            // // .replaceAll('. ', '.\n');  ACAAAAA
            // for (let i = 0; i < allCards.data.length; i++) { 
            //     allCards.data[i].desc.replaceAll('. ', '.\n'); 
            // }
            console.log('YugiohPrices data fetched 😎')
            document.getElementById(`cardSets_${cardId}`).innerHTML += `

        <div class="YGOPinfo" id="yugiohPricesInfo_${cardId}"> 
            <p>Price Shift for <span onclick='changeCardPicture('${cardSetCode}', ${cardId})'>
                <a  style="cursor: pointer" id="${cardSetCode}" class='getBySet greenText'  class="close" data-dismiss="modal" aria-label="Close">${cardSetCode}</a>, updated at ${yugiohPricesResult.data.price_data.price_data.data.prices.updated_at}
            </p>
            <table class="table table-bordered">
            <thead>
                <tr>
                <th scope="col" class="tableHead">Average</th>
                <th scope="col" class="tableHead">High</th>
                <th scope="col" class="tableHead">Low</th>
                </tr>                                    
            </thead>
            <tbody>
                <tr>
                    <td scope="row"  class="cardSet tableBody">$ ${yugiohPricesResult.data.price_data.price_data.data.prices.average}</td>
                    <td scope="row"  class="cardSet tableBody">$ ${yugiohPricesResult.data.price_data.price_data.data.prices.high}</td>
                    <td scope="row"  class="cardSet tableBody">$ ${yugiohPricesResult.data.price_data.price_data.data.prices.low}</td>
                </tr>
            </tbody>
            </table>
            <table class="table table-bordered">
            <thead >	
                <tr>
                    <th scope="col" class="tableHead">1 Day</th>
                    <th scope="col" class="tableHead">3 Days</th>
                    <th scope="col" class="tableHead">7 Days</th>
                    <th scope="col" class="tableHead">21 Days</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row"  class="cardSet tableBody">$ ${yugiohPricesResult.data.price_data.price_data.data.prices.shift.toFixed(3)}</td>
                    <td scope="row"  class="cardSet tableBody">$ ${yugiohPricesResult.data.price_data.price_data.data.prices.shift_3.toFixed(3)}</td>
                    <td scope="row"  class="cardSet tableBody">$ ${yugiohPricesResult.data.price_data.price_data.data.prices.shift_7.toFixed(3)}</td>
                    <td scope="row"  class="cardSet tableBody">$ ${yugiohPricesResult.data.price_data.price_data.data.prices.shift_21.toFixed(3)}</td>
                </tr>
            </tbody>
            </table>
            <table class="table table-bordered">
                <thead >	
                    <tr>
                        <th scope="col" class="tableHead">30 Days</th>
                        <th scope="col" class="tableHead">90 Days</th>
                        <th scope="col" class="tableHead">180 Days</th>
                        <th scope="col" class="tableHead">365 Days</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row"  class="cardSet tableBody">$${yugiohPricesResult.data.price_data.price_data.data.prices.shift_30.toFixed(3)}</td>
                        <td scope="row"  class="cardSet tableBody">$${yugiohPricesResult.data.price_data.price_data.data.prices.shift_90.toFixed(3)}</td>
                        <td scope="row"  class="cardSet tableBody">$${yugiohPricesResult.data.price_data.price_data.data.prices.shift_180.toFixed(3)}</td>
                        <td scope="row"  class="cardSet tableBody">$${yugiohPricesResult.data.price_data.price_data.data.prices.shift_365.toFixed(3)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
            `

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

function sortCards(value, whichCards) {
    resetCurrentCards()
    if (whichCards) {
        currentCards = whichCards.sort(sortBy(`${value}`))
    } else {
        currentCards = allCards.data.sort(sortBy(`${value}`))
    }
}



// #######################################################################

// SEARCHERS

function searchCardsByNameOrDescription(value) {
    deckPricerStatus = false
    // PASAR TODO A MAYUSCULA O MINUSCULA Y LUEGO BUSCAR 
    resetCurrentCards()
    printedResults = resultsPerPage
    query = value.toLowerCase();
    currentCards = allCards.data.filter((card) =>
        `${card.name.toLowerCase()} ${card.desc.toLowerCase()}`.includes(query));
    console.log("Results: " + currentCards.length + " cards")
    // console.log(filteredQueryResults);
    // if (filteredQueryResults.length < 30 ){
    if (resultsPerPage < currentCards.length) {
        printCards(resultsPerPage, currentCards, text_CardResults1, currentCards.length, text_CardResults2) //https://codepen.io/piotrek/pen/mXpRmQ
    } else {
        printCards(currentCards.length, currentCards, text_CardResults1, currentCards.length, text_CardResults2)
    }
    // }
}


function searchByExactValue(field, value) {
    deckPricerStatus = false

    resetCurrentCards()
    currentCards = allCards.data.filter((card) => card[field] === value)
    // console.log(filteredCards)
}



// SEARCH BY SOME VALUE, FOR EXAMPLE
// searchByExactValue("archetype", "Branded") 
// WILL SEARCH "ARCHETYPES" THAT ARE EQUAL TO "BRANDED"

function searchByArchetype(value, justsearch) {
    deckPricerStatus = false

    window.scrollTo(0, 0);
    printedResults = resultsPerPage
    resetCurrentCards()
    searchByExactValue("archetype", value)
    printCards(currentCards.length, currentCards, '<span class="greenText">' + currentCards.length + '</span>', text_Archetype1 + '<span class="purpleText">' + value + '</span> ', text_Archetype2)



}

// FIND BY SET 

function searchBySet(set_name) {
    deckPricerStatus = false

    window.scrollTo(0, 0);
    printedResults = resultsPerPage
    let thisSet = []

    for (let i = 0; i < allCards.data.length; i++) {

        if (allCards.data[i].card_sets) {

            for (let b = 0; b < allCards.data[i].card_sets.length; b++) {


                if (allCards.data[i].card_sets[b].set_name === set_name) {
                    // if (thisSet.length) {
                    //     if (allCards.data[i].name == thisSet[thisSet.length - 1].name) {

                    //         console.log("card not pushed")
                    //         return

                    //     }
                    // } else {
                    //     console.log("card pushed")
                    thisSet.push(allCards.data[i])

                    if (thisSet[thisSet.length - 1] === allCards.data[i]) {
                        break
                        // console.log(thisSet[thisSet.length - 1])
                    }

                    // }

                }
            }

        }



    }

    let setImage = set_name
        .replace(/ /g, "_")
        .replace(/:/g, "_")
        .replace(/-/g, "_")
        .replace(/!/g, "_")


    if (thisSet.length < 9) {
        printCards(resultsPerPage, thisSet, '<span class="greenText">' + thisSet.length + '</span>', text_SetResults1 + '<span class="purpleText">' + set_name + '</span> ', text_SetResults2 + `<br> <span><img src="https://static-7.studiobebop.net/ygo_data/set_images/${setImage}.jpg" class="card-img-bottom setImageTitle"> </span> `, "aloneCard")
    } else {
        printCards(resultsPerPage, thisSet, '<span class="greenText">' + thisSet.length + '</span>', text_SetResults1 + '<span class="purpleText">' + set_name + '</span> ', text_SetResults2 + `<br> <span><img src="https://static-7.studiobebop.net/ygo_data/set_images/${setImage}.jpg" class="card-img-bottom setImageTitle"> </span> `)
    }


    resetCurrentCards()
    currentCards = thisSet




}

// FIND BY FORMATT 

function searchByFormat(format, onlyFormat) {
    deckPricerStatus = false

    window.scrollTo(0, 0);
    printedResults = resultsPerPage
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

    if (onlyFormat != undefined) {
        // console.log('searching only format')

    } else {

        if (format == "Common Charity") {
            printCards(resultsPerPage, thisFormat, '<span class="greenText">' + thisFormat.length + '</span>' + text_FormatResults1, '<a class="purpleText" href="https://ygoprodeck.com/article/common-charity-format-which-cards-are-available-237477" target="_blank">' + format + '</a>', text_FormatResults2)

        } else if (format.includes("GOAT")) {
            printCards(resultsPerPage, thisFormat, '<span class="greenText">' + thisFormat.length + '</span>' + text_FormatResults1, '<a class="purpleText" href="https://www.formatlibrary.com/formats/goat" target="_blank">' + format + '</a>', text_FormatResults2)

        } else if (format == "Edison") {
            printCards(resultsPerPage, thisFormat, '<span class="greenText">' + thisFormat.length + '</span>' + text_FormatResults1, '<a class="purpleText" href="https://www.formatlibrary.com/formats/edison" target="_blank">' + format + '</a>', text_FormatResults2)

        } else {
            printCards(resultsPerPage, thisFormat, '<span class="greenText">' + thisFormat.length + '</span>' + text_FormatResults1, '<span class="purpleText" >' + format + '</span>', text_FormatResults2)
        }

    }

    console.log(thisFormat.length + ' cards from the format ' + format)
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

// FILTER SETS BY STARTING LETTER

function filterSets(letter) {
    deckPricerStatus = false
    filteredSets = allSets.filter(f => f.set_name.toLowerCase().startsWith(letter.toLowerCase()))
    printSets(filteredSets.length, filteredSets, 'Sets starting with <span class="purpleText">' + letter + ' </span>')
    currentCards = filteredSets
}

// FILTER ARCHETYPES BY STARTING LETTER

function filterArchetypes(letter) {
    deckPricerStatus = false

    filteredArchetypes = allArchetypes.filter(f => f.archetype_name.toLowerCase().startsWith(letter.toLowerCase()))
    printArchetypes(filteredArchetypes.length, filteredArchetypes, 'Archetypes starting with <span class="purpleText">' + letter + ' </span>')
    currentCards = filteredArchetypes
}

// #######################################################################

// PRINT IN SCREEN

function printCards(howMany, cards, title1, title2, title3, view) {

    setsStatus = false
    resetCurrentCards()
    currentCards = cards
    cardsSection.innerHTML = ("")

    titlesSection.innerHTML = title1 + title2 + title3
    // console.log(cards2print)

    for (let i = 0; i < (howMany); i++) {
        try {
            if (howMany < 7) {
                createNormalCard(currentCards[i], "aloneCard")
            } else if (view) {
                createNormalCard(currentCards[i], view)
            } else {
                createNormalCard(currentCards[i])
            }
        } catch (error) {
            console.error(error);
        }
    }


}

function createFilterLetters(what2filter) {
    cardsSection.innerHTML += `
    <h2 class='setLetters'>
        <span onclick="${what2filter}('A')"> A </span>
        <span onclick="${what2filter}('C')"> C </span>
        <span onclick="${what2filter}('D')"> D </span>
        <span onclick="${what2filter}('B')"> B </span>
        <span onclick="${what2filter}('F')"> F </span>
        <span onclick="${what2filter}('G')"> G </span>
        <span onclick="${what2filter}('H')"> H </span>
        <span onclick="${what2filter}('I')"> I </span>
        <span onclick="${what2filter}('J')"> J </span>
        <span onclick="${what2filter}('K')"> K </span>
        <span onclick="${what2filter}('L')"> L </span>
        <span onclick="${what2filter}('M')"> M </span>
        <span onclick="${what2filter}('N')"> N </span>
        <span onclick="${what2filter}('O')"> O </span>
        <span onclick="${what2filter}('P')"> P </span>
        <span onclick="${what2filter}('Q')"> Q </span>
        <span onclick="${what2filter}('R')"> R </span>
        <span onclick="${what2filter}('S')"> S </span>
        <span onclick="${what2filter}('T')"> T </span>
        <span onclick="${what2filter}('U')"> U </span>
        <span onclick="${what2filter}('V')"> V </span>
        <span onclick="${what2filter}('W')"> W </span>
        <span onclick="${what2filter}('X')"> X </span>
        <span onclick="${what2filter}('Y')"> Y </span>
        <span onclick="${what2filter}('Z')"> Z </span>
    </h2>`


}

function printSets(howMany, sets, title) {
    deckPricerStatus = false
    setsStatus = true
    cardsSection.innerHTML = ("")
    let cards2print = []
    cards2print = sets

    titlesSection.innerHTML = title
    // console.log(cards2print)
    createFilterLetters('filterSets')

    for (let i = 0; i < howMany; i++) {
        cards2print.push(sets[i])
        try {
            createSet(cards2print[i])
        } catch (error) {
            console.error(error);
        }
    }


}


function printArchetypes(howMany, archetypes, title) {
    deckPricerStatus = false
    setsStatus = true
    cardsSection.innerHTML = ("")
    let cards2print = []
    // cards2print = archetypes

    titlesSection.innerHTML = title
    // console.log(cards2print)

    createFilterLetters('filterArchetypes')

    for (let i = 0; i < howMany; i++) {
        cards2print.push(archetypes[i].archetype_name)
        try {
            createArchetype(cards2print[i])
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
    jQuery(`#cardName_${id}`).detach().appendTo(`#cardHeader_${id}`)
    jQuery(`#cardSubTitle_${id}`).detach().appendTo(`#cardHeader_${id}`)

}


// #######################################################################

// LOAD MORE CARDS RESULTS

function printMoreResults(howMany) {

    // AGREGAR VERIFICACION CON URL, CUANDO SEA /SETS sets=true
    if (setsStatus == true) {
        for (let i = printedResults; i < printedResults + howMany; i++) {
            try {
                if (currentCards[i].archetype_name) {
                    // console.log("yo")
                    createArchetype(currentCards[i].archetype_name)

                } else {
                    createSet(currentCards[i])
                }
            } catch (error) {
                // console.error(error);
                console.log("No more sets!")
                // return
            }


        }
        // printedResults = printedResults + howMany


    } else {

        for (let i = printedResults; i < printedResults + howMany; i++) {
            try {
                createNormalCard(currentCards[i])
            } catch (error) {
                // console.error(error);
                console.log("No more cards!")

            }


        }


    }

    printedResults = printedResults + howMany

    // console.log(printedResults)

}


// LOAD MORE CARDS BUTTON


// var moreCardsbtn = $('#loadMoreCards');


// $(window).scroll(function() {
//     if ($(window).scrollTop() > 300) {
//         moreCardsbtn.addClass('show');
//     } else {
//         moreCardsbtn.removeClass('show');
//     }
// });


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


// #######################################################################

function filterStaples(letter) {
    filteredStaples = staples.filter(f => f.name.toLowerCase().startsWith(letter.toLowerCase()))
    // currentCards = filteredStaples
    printCards(resultsPerPage, filteredStaples, 'Staples starting with <span class="purpleText">' + letter + ' </span>', filteredStaples.length + ' cards <br> ' + text_allFilters, '')

    // console.log(filterSets)
    // FUNCIONA PERO HABRIA QUE AGREGAR EL FILTRO DE LETRAS PARA LAS staples, YA QUE AL CREARLAS NO LO VUELVE A PONER 

}

// Print Staples

async function printStaples() {
    deckPricerStatus = false
    currentCards = staplesRaw
    titlesSection.innerHTML = "<span class='greenText'>" + currentCards.length + " </span> staple cards"
    cardsSection.innerHTML = ("")

    cardsSection.innerHTML += text_allFilters

    await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + staplesRaw + "&misc=yes&sort=name")
        .then(cardInfo => cardInfo.json())
        .then(data => {
            //console.log(data);
            currentCards = data.data;

            staples = data.data


            for (b = 0; b < staplesRaw.length; b++) {
                if (b > resultsPerPage - 1) {
                    console.log('No more cards!');
                    return
                } else {
                    createNormalCard(currentCards[b])
                }
            }

        });

}



// #######################################################################

// OPEN FILTER BAR

document.getElementById("filtersBar").addEventListener("click", function(event) {
    event.preventDefault()
    openFilterBar()
});

function openFilterBar() {

}


// listen for scroll event and load more images if we reach the bottom of window
window.addEventListener('scroll', () => {
    // console.log("scrolled", window.scrollY) //scrolled from top
    //  console.log(window.innerHeight) //visible part of screen
    let loadHeight = (document.documentElement.scrollHeight)
    // console.log(document.documentElement.scrollHeight)
    //  console.log(loadHeight)
    // console.log(window.scrollY + window.innerHeight) //1560 aprox primera aparicion
    // console.log(loadHeight)
    if (window.scrollY + window.innerHeight >= loadHeight - 100 && deckPricerStatus == false) {
        printMoreResults(resultsPerPage)

    }
    // else {alert("No more cards 😓")}
})


// NAVIGATE CARDS

function getIndex(cardId, orientation) {

    cardIndex = currentCards.findIndex(object => {
        return object.id === cardId;
    });

    // console.log(index + 1); // 👉️ Position of card

    if (orientation == 'right') {
        return cardIndex + 1
        // console.log(cardIndex + 1)
    } else if (orientation == 'left') {
        return cardIndex - 1
        // console.log(cardIndex - 1)
    }
}



// FILTER CARDS 

// Check this https://codepen.io/piotrek/pen/mXpRmQ
// also this lonefy.vscode-JS-CSS-HTML-formatter

// 👉https://www.javatpoint.com/oprweb/test.jsp?filename=how-to-get-all-checked-checkbox-value-in-javascript3


function resetFilters() {
    let getcheckboxes = document.getElementsByName('checkbox');
    for (var i = 0; i < getcheckboxes.length; i++) {
        getcheckboxes[i].checked = false;
    }
    descForm.value = ''
    atkForm.value = ''
    defForm.value = ''
}

function getCheckboxValues() {
    let markedCheckboxType = document.getElementsByClassName('typeOfMonsterCard');
    let markedCheckboxAttribute = document.getElementsByClassName('attributeOfMonsterCard');
    let markedCheckboxLevel = document.getElementsByClassName('levelOfCard');
    let markedCheckboxRace = document.getElementsByClassName('raceOfMonsterCard');
    let markedCheckboxFormat = document.getElementsByClassName('formatForm');
    let descForm = document.getElementById('descForm').value
    let atkForm = document.getElementById('atkForm').value
    let defForm = document.getElementById('defForm').value


    for (let checkbox of markedCheckboxFormat) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            searchByFormat(checkbox.value, '')
            filteredQueryResults = currentCards
            console.log(currentCards)
            // currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
            // currentCards = currentFilteredResults
        }
    }


    for (let checkbox of markedCheckboxAttribute) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            filteredQueryResults = currentCards.filter(card => card.attribute == checkbox.value)
            console.log(filteredQueryResults)
            currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
        }
    }


    for (let checkbox of markedCheckboxLevel) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            // if (currentFilteredResults[0] && !(checkbox.checked)) { // aca hay que agregar una verificacion de que si no hay otra cosa tildada dentro del mismo grupo filtre en currentfilteredresults, porque si hay otra tildada no va a buscar multiples cosas del mismo tipo
            filteredQueryResults = currentFilteredResults.filter(card => (card.level == checkbox.value) || (card.linkval == checkbox.value))
            currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
            // } else {
            // filteredQueryResults = currentCards.filter(card => (card.level == checkbox.value) || (card.linkval == checkbox.value))
            // currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
            // }
        }
    }


    for (let checkbox of markedCheckboxType) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            if (checkbox.value == 'Ritual Monster') {
                filteredQueryResults = currentCards.filter(card => card.type == checkbox.value || card.type == 'Ritual Effect Monster')
                console.log(filteredQueryResults)
                currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
            } else {
                filteredQueryResults = currentCards.filter(card => card.type == checkbox.value)
                // console.log(filteredQueryResults)
                currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
            }
        }
        // console.log(currentFilteredResults)
    }



    // console.log(currentFilteredResults)


    for (let checkbox of markedCheckboxRace) {
        if (checkbox.checked) {
            // console.log(checkbox.value);

            if (checkbox.value.includes("Spell") || checkbox.value.includes("Trap")) {
                if (checkbox.value == 'Normal Spell' || checkbox.value == 'Continuous Spell') {
                    let value = checkbox.value.replace(' Spell', '')
                    filteredQueryResults = currentCards.filter(card => (card.race == value && card.type == 'Spell Card'))
                    currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
                } else if (checkbox.value == 'Normal Trap' || checkbox.value == 'Continuous Trap') {
                    let value = checkbox.value.replace(' Trap', '')
                    filteredQueryResults = currentCards.filter(card => (card.race == value && card.type == 'Trap Card'))
                    currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
                }
            } else {
                filteredQueryResults = currentCards.filter(card => card.race == checkbox.value)
                currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
            }


        }
    }


    // console.log(currentFilteredResults)


    if (descForm != '') {

        if (currentFilteredResults[0]) {
            filteredQueryResults = currentFilteredResults.filter((card) =>
                `${card.name.toLowerCase()} ${card.desc.toLowerCase()}`.includes(descForm));
            currentFilteredResults = filteredQueryResults
        } else {
            filteredQueryResults = currentCards.filter((card) =>
                `${card.name.toLowerCase()} ${card.desc.toLowerCase()}`.includes(descForm));
            currentFilteredResults = filteredQueryResults
        }
    }
    // console.log(currentFilteredResults)
    if (atkForm != '') {
        if (currentFilteredResults[0]) {
            filteredQueryResults = currentFilteredResults.filter(card => card.atk == atkForm)
            currentFilteredResults = filteredQueryResults
        } else {
            filteredQueryResults = currentCards.filter(card => card.atk == atkForm)
            currentFilteredResults = filteredQueryResults
        }
    }

    // console.log(currentFilteredResults)

    if (defForm != '') {
        if (currentFilteredResults[0]) {
            filteredQueryResults = currentFilteredResults.filter(card => card.def == defForm)
            currentFilteredResults = filteredQueryResults
        } else {
            filteredQueryResults = currentCards.filter(card => card.def == defForm)
            currentFilteredResults = filteredQueryResults
        }
    }



}


document.getElementById('filterButton').onclick = function() {
    // when adding other formats this value should be changed to whatever the format is 
    // currentCards = allCards.data
    currentFilteredResults = []
    getCheckboxValues()
    resetFilters()
    currentCards = currentFilteredResults.sort(sortBy("name"))
    // console.log(currentCards)
    if (!currentCards[0]) {
        currentCards = allCards.data
    }
    printCards(resultsPerPage, currentCards, '<span class="purpleText">' + currentCards.length + ' </span> cards fit your criteria ', "", "")

}

// KEY NAVIGATION 

$(document).on('show.bs.modal', '.modal', function() {

    // console.log(this)
    if (this.id) {
        let thisModal = this.id.replace('card_', '')
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    // alert('left');
                    // console.log(thisModal)
                    document.getElementById(`previousCard_${thisModal}`).click();
                    break;
                case 38:
                    // alert('up');
                    break;
                case 39:
                    // alert('right');
                    // console.log(thisModal)
                    document.getElementById(`nextCard_${thisModal}`).click();
                    break;
                case 40:
                    // alert('down');
                    break;
            }
        };
    }
})


// SHOW RANDOM CARDS 

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var randomCards = []

function searchRandomCards(howMany) {


    // console.log(getRandomInt(currentCards.length));
    for (i = 0; i < currentCards.length; i++) {

        randomCards.push(currentCards[getRandomInt(currentCards.length)])

    }
    // console.log(randomCards)
    currentCards = randomCards
    printCards(resultsPerPage, currentCards, 'Random cards! ', "", "")

}


function searchByBanlist(banlist, title) {

    // window.scrollTo(0, 0);
    printedResults = resultsPerPage
    let thisBanlist = []
    let bannedCards = []
    let limitedCards = []
    let semiLimitedCards = []


    for (let i = 0; i < allCards.data.length; i++) {


        if (allCards.data[i].banlist_info) {
            // console.log("banlist exist")

            if (banlist == 'ban_tcg') {
                // Verificar que banlist esta pidiendo y mostrar esa, falta definir què info de la carta agregara 
                if (allCards.data[i].banlist_info.ban_tcg) {
                    thisBanlist.push(allCards.data[i])
                    // console.log(thisBanlist)
                    if (allCards.data[i].banlist_info.ban_tcg == 'Banned') {
                        bannedCards.push(allCards.data[i])
                    } else if (allCards.data[i].banlist_info.ban_tcg == 'Limited') {
                        limitedCards.push(allCards.data[i])
                    } else if (allCards.data[i].banlist_info.ban_tcg == 'Semi-Limited') {
                        semiLimitedCards.push(allCards.data[i])
                    }
                }
            } else if (banlist == 'ban_ocg') {
                if (allCards.data[i].banlist_info.ban_ocg) {
                    thisBanlist.push(allCards.data[i])
                    // console.log(thisBanlist)
                    if (allCards.data[i].banlist_info.ban_ocg == 'Banned') {
                        bannedCards.push(allCards.data[i])
                    } else if (allCards.data[i].banlist_info.ban_ocg == 'Limited') {
                        limitedCards.push(allCards.data[i])
                    } else if (allCards.data[i].banlist_info.ban_ocg == 'Semi-Limited') {
                        semiLimitedCards.push(allCards.data[i])
                    }
                }
            } else if (banlist == 'ban_goat') {
                if (allCards.data[i].banlist_info.ban_goat) {
                    thisBanlist.push(allCards.data[i])
                    // console.log(thisBanlist)
                    if (allCards.data[i].banlist_info.ban_goat == 'Banned') {
                        bannedCards.push(allCards.data[i])
                    } else if (allCards.data[i].banlist_info.ban_goat == 'Limited') {
                        limitedCards.push(allCards.data[i])
                    } else if (allCards.data[i].banlist_info.ban_goat == 'Semi-Limited') {
                        semiLimitedCards.push(allCards.data[i])
                    }
                }
            } else if (banlist == 'ban_edison') {
                if (EDISONBannedCards.includes(allCards.data[i].name)) {
                    bannedCards.push(allCards.data[i])
                } else if (EDISONLimitedCards.includes(allCards.data[i].name)) {
                    limitedCards.push(allCards.data[i])
                } else if (EDISONSemiLimitedCards.includes(allCards.data[i].name)) {
                    semiLimitedCards.push(allCards.data[i])
                }
            }
        }



    }

    // await searchbanlist()


    // console.log(thisBanlist)
    // console.log(bannedCards)
    // console.log(limitedCards)
    // console.log(semiLimitedCards)
    // PRINT CARDS 

    titlesSection.innerHTML = `${text_banlist1}${title}${text_banlist2}`
    cardsSection.innerHTML = `
    <div id="banCardsSection"> 
        <div id="banSection" class="container-fluid row cardSection" >
            <div class="banlistTitle">
                <span class="iconsSprite banned"></span>BANNED CARDS<span class="iconsSprite banned">
                </span>
            </div>
        </div>
        <div id="limitedSection" class="container-fluid row cardSection ">
            <div class="banlistTitle">
                <span class="iconsSprite limited "></span>LIMITED CARDS<span class="iconsSprite limited">
                </span>
            </div>
        </div>
        <div id="semiLimitedSection" class="container-fluid row cardSection">
            <div class="banlistTitle">
                <span class="iconsSprite semi-limited"></span>SEMI-LIMITED CARDS<span class="iconsSprite semi-limited">
                </span>
            </div>
        </div>
    </div>
    `
    thisBanlist.sort(sortBy(`name`))
    bannedCards.sort(sortBy(`name`))
    limitedCards.sort(sortBy(`name`))
    semiLimitedCards.sort(sortBy(`name`))


    for (let i = 0; i < bannedCards.length; i++) {
        createNormalCard(bannedCards[i], 'banSection')
    }
    for (let i = 0; i < limitedCards.length; i++) {
        createNormalCard(limitedCards[i], 'limitedSection')
    }
    for (let i = 0; i < semiLimitedCards.length; i++) {
        createNormalCard(semiLimitedCards[i], 'semiLimitedSection')
    }


    currentCards = thisBanlist
    printedResults = thisBanlist.length
    // createNormalCard(card, view)

    // $(".loader-wrapper").fadeOut("slow");



}

var EDISONBannedCards = [
    `Black Luster Soldier - Envoy of the Beginning`,
    `Chaos Emperor Dragon - Evoy of the End`,
    `Cyber Jar`,
    `Cyber-Stein`,
    `Dark Magician of Chaos`,
    `Dark Strike Fighter`,
    `Destiny HERO - Disk Commander`,
    `Fiber Jar`,
    `Magical Scientist`,
    `Magician of Faith`,
    `Makyura the Destructor`,
    `Sinister Serpent`,
    `Thousand-Eyes Restrict`,
    `Tribe-Infecting Virus`,
    `Tsukuyomi`,
    `Victory Dragon`,
    `Witch of the Black Forest`,
    `​Yata-Garasu`,
    `Butterfly Dagger - Elma`,
    `Card of Safe Return`,
    `Change of Heart`,
    `Confiscation`,
    `Dark Hole`,
    `Delinquent Duo`,
    `Dimension Fusion`,
    `Graceful Charity`,
    `Harpie's Feather Duster`,
    `Last Will`,
    `Monster Reborn`,
    `Metamorphosis`,
    `Mirage of Nightmare`,
    `Painful Choice`,
    `Pot of Greed`,
    `Premature Burial`,
    `Raigeki`,
    `Snatch Steal`,
    `The Forceful Sentry`,
    `Crush Card Virus`,
    `Exchange of the Spirit`,
    `Imperial Order`,
    `Last Turn`,
    `Ring of Destruction`,
    `​Time Seal`
]

var EDISONLimitedCards = [
    `​Black Rose Dragon`,
    `Blackwing - Gale the Whirlwind`,
    `Brionac, Dragon of the Ice Barrier`,
    `Card Trooper`,
    `Chaos Sorcerer`,
    `Dark Armed Dragon`,
    `Elemental Hero Stratos`,
    `Exodia the Forbidden One`,
    `Gladiator Beast Bestiari`,
    `Gorz the Emissary of Darkness`,
    `Goyo Guardian`,
    `Left Arm of the Forbidden One`,
    `Left Leg of the Forbidden One`,
    `Lumina, Lightsworn Summoner`,
    `Marshmallon`,
    `Mezuki`,
    `Mind Master`,
    `Morphing Jar`,
    `Necroface`,
    `Necro Gardna`,
    `Neo-Spacian Grand Mole`,
    `Night Assailant`,
    `Plaguespreader Zombie`,
    `Rescue Cat`,
    `Right Arm of the Forbidden One`,
    `Right Leg of the Forbidden One`,
    `Sangan`,
    `Snipe Hunter`,
    `Spirit Reaper`,
    `Summoner Monk`,
    `Tragoedia​`,
    `Advanced Ritual Art`,
    `Allure of Darkness`,
    `Brain Control`,
    `Burial from a Different Dimension`,
    `Card Destruction`,
    `Charge of the Light Brigade`,
    `Cold Wave`,
    `Destiny Draw`,
    `Emergency Teleport`,
    `Foolish Burial`,
    `Future Fusion`,
    `Giant Trunade`,
    `Heavy Storm`,
    `Level Limit - Area B`,
    `Limiter Removal`,
    `Megamorph`,
    `Mind Control`,
    `Monster Gate`,
    `Mystical Space Typhoon`,
    `One for One`,
    `Overload Fusion`,
    `Reasoning`,
    `Reinforcement of the Army`,
    `Scapegoat`,
    `Swords of Revealing Light​`,
    `Call of the Haunted`,
    `Ceasefire`,
    `Gravity Bind`,
    `Magic Cylinder`,
    `Magical Explosion`,
    `Mind Crush`,
    `Mirror Force`,
    `Ojama Trio`,
    `Return from the Different Dimension`,
    `Solemn Judgment`,
    `The Transmigration Prophecy`,
    `Torrential Tribute`,
    `Trap Dustshoot`,
    `Wall of Revealing Light`
]

var EDISONSemiLimitedCards = [
    `Cyber Dragon`,
    `Dandylion`,
    `Demise, King of Armageddon`,
    `Destiny HERO - Malicious`,
    `Goblin Zombie`,
    `Honest`,
    `Judgment Dragon`,
    `Lonefire Blossom`,
    `Treeborn Frog`,
    `Black Whirlwind`,
    `Chain Strike`,
    `Gold Sarcophagus`,
    `Magical Stone Excavation`,
    `United We Stand`,
    `Bottomless Trap Hole`,
    `Royal Decree`,
    `Royal Oppression`,
    `Skill Drain `,
    `​Ultimate Offering`
]

function about() {
    alert('not done yet :<')
}

// DECK PRICER
var deck = {
    creator: [],
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
};

var rawDeck = {
    creator: [],
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
};

var lowestPriceForDeck = {
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
};

var highetsPriceForDeck = {
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
};

var lowestCardPriceRaw = {
    name: [],
    rarity: [],
    price: [],
    set: [],
    setcode: [],
    id: []
};

var lowestCardPrice
var mainDeckDuplicates
var extraDeckDuplicates
var sideDeckDuplicates
var deckInfo
var deckInfo_table

let area = document.getElementById('dropover');
area.addEventListener('dragover', e => e.preventDefault());
area.addEventListener('drop', readFileDragAndDrop);


function deckPricer() {

    deckPricerStatus = true
    titlesSection.innerHTML = ""
    cardsSection.innerHTML = `
        <div>
                <div id="deckPricer" >
                    <div id="deckPricerDissapear">
                        <h2 >${deckPricer_chooseDeck}</h2> 
                        <label class="fileUpload">
                            <input type="file" id="file-input" class="form-control-file"/>
                            <h2><i class="bi bi-folder-plus"></i> ${deckPricer_dropkYdk}</h2>
                            <h3> ${deckPricer_searchBar} </h3>

                        </label>
                    </div>
                    <div id="deck">
                        <div id="deck_creator">
                        </div>
                        <hr>
                        <h2>${deckPricer_mainDeck}</h2>
                        <div id="deck_main">
                        </div>
                        <hr>
                        <h2>${deckPricer_extraDeck}</h2>
                        <div id="deck_extra">
                        </div>
                        <hr>
                        <h2>${deckPricer_sideDeck}</h2>
                        <div id="deck_side">
                        </div>
                    </div>
                    <button type="button" class="btn btn-secondary btn-lg btn-block deckPricerButton" onclick="searchLowestPrices()" >${deckPricer_button}</button>
                    <div id="deck_info">
                
                    </div>


                </div>
            </div>
    `




    document
        .getElementById("file-input")
        .addEventListener("change", readFile, false);

}


// Create deck array 

function createDeckArray() {
    textFromFile = textFromFile.replace("#created by ", "#creator:");
    textFromFile = textFromFile.replace("#main", "#main:");
    textFromFile = textFromFile.replace("#extra", "#extra:");
    textFromFile = textFromFile.replace("!", "#");
    textFromFile = textFromFile.replace(" ", "");
    textFromFile = textFromFile.replace("#side", "#side:");
    // Values From .ydk
    var rawinfo = textFromFile.split("#creator:")
    // console.log(rawinfo[1])
    var rawname = rawinfo[1].split("#main:")
    // console.log("Deck Creator : ", rawname[0])
    var rawmain = rawname[1].split("#extra:")
    // console.log("Main deck : ", rawmain[0])
    var rawextra = rawmain[1].split("#side:")
    // console.log("Extra deck : ", rawextra[0])
    // console.log("Side deck : ", rawextra[1])
    // CREATOR 
    deck.creator = rawname[0].replace(/\r\n/g, "")
    rawDeck.creator = rawname[0].replace(/\r\n/g, "")
    // MAIN DECK
    deck.mainDeck = rawmain[0].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.mainDeck = deck.mainDeck
    deck.mainDeck = deck.mainDeck.split(","); //Convert to array
    // EXTRA DECK
    deck.extraDeck = rawextra[0].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.extraDeck = deck.extraDeck
    deck.extraDeck = deck.extraDeck.split(",");
    // SIDE DECK
    deck.sideDeck = rawextra[1].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.sideDeck = deck.sideDeck
    deck.sideDeck = deck.sideDeck.split(",");

}


// CLEAR DECK 

function clearDeck() {
    var deckInfo = document.getElementById("deck_info")
    var deckDiv = document.getElementById("deck")
    var deckCreator = document.getElementById("deck_creator")
    var deckMain = document.getElementById("deck_main")
    var deckExtra = document.getElementById("deck_extra")
    var deckSide = document.getElementById("deck_side")

    deckCreator.innerHTML = ""
    deckMain.innerHTML = ""
    deckExtra.innerHTML = ""
    deckSide.innerHTML = ""

}


// Drag and drop 

function readFileDragAndDrop(e) {
    e.preventDefault();
    try {

        if (document.getElementById('deckPricer')) {
            clearDeck()
        } else {
            deckPricer()
            clearDeck()
        }
        file = e.dataTransfer.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result;
            // console.log(file)
            showContent(content);
        };
        reader.readAsText(file);

    } catch (error) {
        console.error(error);
        alert("wrong type of file")
    }
}

// Read file 

function readFile(e) {
    file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
        let content = e.target.result;
        showContent(content);
    };
    reader.readAsText(file);
}

// DOWNLOAD DECK

// Function to download data to a file
function downloadDeck(data, filename, type) {


    var deck2save = '#created by ' + data.creator + '\r\n' + '#main' + '\r\n' + data.mainDeck + '\r\n' + '#extra' + '\r\n' + data.extraDeck + '\r\n' + '!side' + '\r\n' + data.sideDeck

    if (!filename) {
        filename = prompt("Enter a value");
        filename += '.ydk'
    }


    var file = new Blob([deck2save.replaceAll(',', '\r\n')], {
        type: type
    });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

// SEARCH LOWEST PRICES TABLE
function searchLowestPrices() {

    if (lowestPriceForDeck.mainDeck.length === 0 && lowestPriceForDeck.extraDeck.length === 0 && lowestPriceForDeck.sideDeck.length === 0) {
        alert('Upload a deck first!')
        return
    }

    lowestPriceForDeck = {
        mainDeck: [],
        extraDeck: [],
        sideDeck: [],
    };

    deckInfo = document.getElementById("deck_info")
    deckInfo.innerHTML = `  
    <table class="table table-hover" id="deck_info_table" >
      <thead>
        <tr>
          <th scope="col">${deckPricer_card}</th>
          <th scope="col">${deckPricer_rarity}</th>
          <th scope="col">${deckPricer_setCode}</th>
          <th scope="col">${deckPricer_lowestPrice}</th>
        </tr>
      </thead>
      <tbody id='deckInfo_table'>
    </tbody> `
    deckInfo_table = document.getElementById("deckInfo_table")
    deckInfo_table.innerHTML += `
    <tr>
      <td class="purpleText">MAIN DECK</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    
     `
    searchDeckValue(deck.mainDeck)
    deckInfo_table.innerHTML += `
    <tr>
      <td class="purpleText">EXTRA DECK</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
     `
    searchDeckValue(deck.extraDeck)
    deckInfo_table.innerHTML += `
    <tr>
      <td class="purpleText">SIDE DECK</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
     `
    searchDeckValue(deck.sideDeck)
    let totalprice = 0
    let decktotalprice = 0
    let extradecktotalprice = 0
    let sidedecktotalprice = 0

    console.log()
    decktotalprice = lowestPriceForDeck.mainDeck.reduce((a, b) => a + b, 0);
    extradecktotalprice = lowestPriceForDeck.extraDeck.reduce((a, b) => a + b, 0);
    sidedecktotalprice = lowestPriceForDeck.sideDeck.reduce((a, b) => a + b, 0);
    totalprice = decktotalprice + extradecktotalprice + sidedecktotalprice
    deckInfo_table.innerHTML += `
    <tr style="background-color: black">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
     `
    deckInfo_table.innerHTML += `
     <tr>
       <td>${deckPricer_tp}${deckPricer_mainDeck} : </td>
       <td></td>
       <td></td>
       <td>$${decktotalprice.toFixed(2)}</td>
     </tr>
      `
    deckInfo_table.innerHTML += `
     <tr>
       <td>${deckPricer_tp}${deckPricer_extraDeck} : </td>
       <td></td>
       <td></td>
       <td>$${extradecktotalprice.toFixed(2)}</td>
     </tr>
      `
    deckInfo_table.innerHTML += `
      <tr>
        <td>${deckPricer_tp}${deckPricer_sideDeck} : </td>
        <td></td>
        <td></td>
        <td>$${sidedecktotalprice.toFixed(2)}</td>
      </tr>
       `

    deckInfo_table.innerHTML += `
       <tr>
         <td>${deckPricer_tp}${deckPricer_deck} : </td>
         <td></td>
         <td></td>
         <td>$${totalprice.toFixed(2)}</td>
       </tr>
        `


}

function getCardsById(cardIds, where, checkDuplicates, modifyDeckArray) {



    if (checkDuplicates == "deck") {
        checkDuplicates = mainDeckDuplicates;
        // console.log("main!!")
    }
    if (checkDuplicates == "extra") {
        checkDuplicates = extraDeckDuplicates;
        // console.log("extra!!")
    }
    if (checkDuplicates == "side") {
        checkDuplicates = sideDeckDuplicates;
        // console.log("side!!")
    }

    (async function() {
        await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + cardIds + "&misc=yes")

            .then(cardInfo => cardInfo.json())
            .then(data => {
                currentCardsFromDeck = data.data;
                // console.log(currentCardsFromDeck)
                currentCards = []
                currentCardsFromDeck.sort(sortBy(`type`), currentCardsFromDeck);
                // currentCardsFromDeck.sort(sortBy(`level`), currentCardsFromDeck);

                // currentCardsFromDeck.sort(sortByType);
                for (var b = 0; b < currentCardsFromDeck.length; b++) {
                    // create deck
                    currentCards = currentCards.concat(currentCardsFromDeck[b])
                    createDeck(currentCardsFromDeck[b], where);
                    addCardToDeck(modifyDeckArray, b)
                    // check for card duplicates
                    for (var c = 1; c < checkDuplicates[currentCardsFromDeck[b].id]; c++) {
                        // create duplicates
                        currentCards = currentCards.concat(currentCardsFromDeck[b])

                        createDeckDuplicate(currentCardsFromDeck[b], where);
                        addCardToDeck(modifyDeckArray, b)


                    }

                    // currentCards = currentCardsFromDeck
                    // if (checkDuplicates[results.data[b].id] > 1 ){
                    //  console.log("Duplicate here!")

                    // }
                }
                printedResults = currentCards.length
            });

    })();


}


var lis
var count
// Create cards 
function showContent(content) {
    // console.log(contenido)
    textFromFile = content
    createDeckArray()


    var deckInfo = document.getElementById("deck_info")
    var deckDiv = document.getElementById("deck")
    var deckCreator = document.getElementById("deck_creator")
    var deckMain = document.getElementById("deck_main")
    var deckExtra = document.getElementById("deck_extra")
    var deckSide = document.getElementById("deck_side")
    let cardsInMainDeck
    let cardsInExtraDeck
    let cardsInSideDeck

    if (deck.mainDeck[0] == undefined) {
        console.log("No main deck")
        cardsInMainDeck = 0
    } else if (deck.extraDeck[0] == undefined) {
        console.log("No extra deck")
        cardsInExtraDeck = 0
    } else if (deck.sideDeck[0] == undefined) {
        console.log("No side deck")
        cardsInSideDeck = 0
    } else {
        cardsInMainDeck = deck.mainDeck.length
        cardsInExtraDeck = deck.extraDeck.length
        cardsInSideDeck = deck.sideDeck.length


        deckCreator.innerHTML = `
              ${deckPricer_deckCreator} : ${rawDeck.creator}
              <br>
              ${deckPricer_mainDeck} (${cardsInMainDeck})
              ${deckPricer_extraDeck} (${cardsInExtraDeck})
              ${deckPricer_sideDeck} (${cardsInSideDeck})
              <i class="bi bi-download greenText" onclick="downloadDeck(rawDeck, file.name, 'text')"></i>
                `

        var cardPrices = document.getElementById("cardPrices")
    }

    mainDeckDuplicates = count_duplicate(deck.mainDeck)
    extraDeckDuplicates = count_duplicate(deck.extraDeck)
    sideDeckDuplicates = count_duplicate(deck.sideDeck)



    getCardsById(rawDeck.mainDeck, "deck_main", "deck", "mainDeck")
    getCardsById(rawDeck.extraDeck, "deck_extra", "extra", "extraDeck")
    getCardsById(rawDeck.sideDeck, "deck_side", "side", "sideDeck")


    // Count cards in deck to fit screen
    lis = $(".smallCard");
    count = $(".smallCard").length;

    if (count == 40) {
        lis.addClass('deckCardsfitSize10');
    } else if (count < 40 && count > 60) {
        lis.addClass('deckCardsfitSize10');
    } else if (count >= 60) {
        alert("deck exceeds maximum allowed quantity of cards")
    }


}

// Count duplicates in deck
function count_duplicate(a) {
    let counts = {}

    for (let i = 0; i < a.length; i++) {
        if (counts[a[i]]) {
            counts[a[i]] += 1
        } else {
            counts[a[i]] = 1
        }
    }
    for (let prop in counts) {
        if (counts[prop] >= 2) {
            //  console.log(prop + " counted: " + counts[prop] + " times.")
        }
    }
    //  console.log(counts)
    return counts
}



// Search deck value

function searchDeckValue(value) {
    deckInfo = document.getElementById("deck_info")
    deckInfo_table = document.getElementById("deckInfo_table")

    if (value == deck.mainDeck) {


        for (let b = 0; b < deck.mainDeck.length; b++) {
            lowestCardPriceRaw = {
                name: [],
                rarity: [],
                rarity_code: [],
                price: [],
                set: [],
                setcode: [],
                id: []
            };

            lowestCardPrice = []

            if (deck.mainDeck[b].card_sets == undefined) {
                // console.log("not printed yet")
                lowestPriceForDeck.mainDeck.push(0)
            } else {

                for (let i = 0; i < deck.mainDeck[b].card_sets.length; i++) {

                    if (deck.mainDeck[b].card_sets[i].set_price == 0 || deck.mainDeck[b].card_sets[i].set_rarity == "Collector's Rare" || deck.mainDeck[b].card_sets[i].set_rarity == "Ultimate Rare") {
                        // console.log("set price  = 0") 
                        continue
                    } else {

                        lowestCardPrice.push(Number.parseFloat(deck.mainDeck[b].card_sets[i].set_price))

                    }
                }

                for (let i = 0; i < deck.mainDeck[b].card_sets.length; i++) {
                    if (deck.mainDeck[b].card_sets[i].set_price == Math.min(...lowestCardPrice)) {
                        // console.log("this set is the cheapest "+ JSON.stringify(deck.mainDeck[b].card_sets[i]) )
                        lowestCardPriceRaw.name.push(deck.mainDeck[b].name)
                        lowestCardPriceRaw.rarity.push(deck.mainDeck[b].card_sets[i].set_rarity)
                        lowestCardPriceRaw.rarity_code.push(deck.mainDeck[b].card_sets[i].set_rarity_code)
                        lowestCardPriceRaw.price.push(Number.parseFloat(deck.mainDeck[b].card_sets[i].set_price))
                        lowestCardPriceRaw.set.push(deck.mainDeck[b].card_sets[i].set_name)
                        lowestCardPriceRaw.setcode.push(deck.mainDeck[b].card_sets[i].set_code)
                        lowestCardPriceRaw.id.push(deck.mainDeck[b].id)
                    }
                }


            }
            if (Math.min(...lowestCardPrice) == Infinity) {
                // console.log(Math.min(...lowestCardPrice))
                lowestPriceForDeck.mainDeck.push(0)
            } else {
                lowestPriceForDeck.mainDeck.push(Math.min(...lowestCardPrice))
            }
            deckInfo_table.innerHTML += `
      <tr data-bs-toggle="modal" data-bs-target="#card_${deck.mainDeck[b].id}">
        <td>${deck.mainDeck[b].name}</td>
        <td>${lowestCardPriceRaw.rarity_code}</td>
        <td>${lowestCardPriceRaw.setcode}</td>
        <td>$${lowestPriceForDeck.mainDeck[b]}</td>
      </tr>
      
       `



        }


    } else if (value == deck.extraDeck) {

        for (let b = 0; b < deck.extraDeck.length; b++) {
            lowestCardPriceRaw = {
                name: [],
                rarity: [],
                rarity_code: [],
                price: [],
                set: [],
                setcode: [],
                id: []
            };

            lowestCardPrice = []

            if (deck.extraDeck[b].card_sets == undefined) {
                // console.log("not printed yet")
                lowestPriceForDeck.extraDeck.push(0)
            } else {

                for (let i = 0; i < deck.extraDeck[b].card_sets.length; i++) {

                    if (deck.extraDeck[b].card_sets[i].set_price == 0 || deck.extraDeck[b].card_sets[i].set_rarity == "Collector's Rare" || deck.extraDeck[b].card_sets[i].set_rarity == "Ultimate Rare") {
                        // console.log("set price  = 0") 
                        continue
                    } else {

                        lowestCardPrice.push(Number.parseFloat(deck.extraDeck[b].card_sets[i].set_price))

                    }
                }

                for (let i = 0; i < deck.extraDeck[b].card_sets.length; i++) {
                    if (deck.extraDeck[b].card_sets[i].set_price == Math.min(...lowestCardPrice)) {
                        // console.log("this set is the cheapest "+ JSON.stringify(deck.mainDeck[b].card_sets[i]) )
                        lowestCardPriceRaw.name.push(deck.extraDeck[b].name)
                        lowestCardPriceRaw.rarity.push(deck.extraDeck[b].card_sets[i].set_rarity)
                        lowestCardPriceRaw.rarity_code.push(deck.extraDeck[b].card_sets[i].set_rarity_code)
                        lowestCardPriceRaw.price.push(Number.parseFloat(deck.extraDeck[b].card_sets[i].set_price))
                        lowestCardPriceRaw.set.push(deck.extraDeck[b].card_sets[i].set_name)
                        lowestCardPriceRaw.setcode.push(deck.extraDeck[b].card_sets[i].set_code)
                        lowestCardPriceRaw.id.push(deck.extraDeck[b].id)
                    }
                }

            }
            if (Math.min(...lowestCardPrice) == Infinity) {
                // console.log(Math.min(...lowestCardPrice))
                lowestPriceForDeck.extraDeck.push(0)
            } else {
                lowestPriceForDeck.extraDeck.push(Math.min(...lowestCardPrice))
            }
            deckInfo_table.innerHTML += `
        <tr data-toggle="modal" data-target="#ModalID${deck.extraDeck[b].id}">
          <td>${deck.extraDeck[b].name}</td>
          <td>${lowestCardPriceRaw.rarity_code}</td>
          <td>${lowestCardPriceRaw.setcode}</td>
          <td>$${lowestPriceForDeck.extraDeck[b]}</td>
        </tr>
        
         `



        }


    } else if (value == deck.sideDeck) {

        for (let b = 0; b < deck.sideDeck.length; b++) {
            lowestCardPriceRaw = {
                name: [],
                rarity: [],
                rarity_code: [],
                price: [],
                set: [],
                setcode: [],
                id: []
            };

            lowestCardPrice = []

            if (deck.sideDeck[b].card_sets == undefined) {
                // console.log("not printed yet")
                lowestPriceForDeck.sideDeck.push(0)
            } else {

                for (let i = 0; i < deck.sideDeck[b].card_sets.length; i++) {

                    if (deck.sideDeck[b].card_sets[i].set_price == 0 || deck.sideDeck[b].card_sets[i].set_rarity == "Collector's Rare" || deck.sideDeck[b].card_sets[i].set_rarity == "Ultimate Rare") {
                        // console.log("set price  = 0") 
                        continue
                    } else {

                        lowestCardPrice.push(Number.parseFloat(deck.sideDeck[b].card_sets[i].set_price))

                    }
                }

                for (let i = 0; i < deck.sideDeck[b].card_sets.length; i++) {
                    if (deck.sideDeck[b].card_sets[i].set_price == Math.min(...lowestCardPrice)) {
                        // console.log("this set is the cheapest "+ JSON.stringify(deck.mainDeck[b].card_sets[i]) )
                        lowestCardPriceRaw.name.push(deck.sideDeck[b].name)
                        lowestCardPriceRaw.rarity.push(deck.sideDeck[b].card_sets[i].set_rarity)
                        lowestCardPriceRaw.rarity_code.push(deck.sideDeck[b].card_sets[i].set_rarity_code)
                        lowestCardPriceRaw.price.push(Number.parseFloat(deck.sideDeck[b].card_sets[i].set_price))
                        lowestCardPriceRaw.set.push(deck.sideDeck[b].card_sets[i].set_name)
                        lowestCardPriceRaw.setcode.push(deck.sideDeck[b].card_sets[i].set_code)
                        lowestCardPriceRaw.id.push(deck.sideDeck[b].id)
                    }
                }

            }
            if (Math.min(...lowestCardPrice) == Infinity) {
                // console.log(Math.min(...lowestCardPrice))
                lowestPriceForDeck.sideDeck.push(0)
            } else {
                lowestPriceForDeck.sideDeck.push(Math.min(...lowestCardPrice))
            }
            deckInfo_table.innerHTML += `
          <tr data-toggle="modal" data-target="#ModalID${deck.sideDeck[b].id}">
            <td>${deck.sideDeck[b].name}</td>
            <td>${lowestCardPriceRaw.rarity_code}</td>
            <td>${lowestCardPriceRaw.setcode}</td>
            <td>$${lowestPriceForDeck.sideDeck[b]}</td>
          </tr>
          
           `

        }

    }


}


// ADD CARD TO DECK 
// addCardButton.addEventListener("click", preventDefault(), false);
// while (document.getElementsByClassName("add2deckButton").length > 0) {
//     console.log("yo")
//     var addCardButton = document.getElementsByClassName("add2deckButton")
//     addCardButton.addEventListener('click', e => e.preventDefault());
//     addCardToDeck()

// }

function addCardToDeck(card, where) {

    if (deck.mainDeck.length == 0 && deck.extraDeck.length == 0 && deck.sideDeck.length == 0) {
        let deckCreator = document.getElementById("deck_creator")
        let cardsInMainDeck
        let cardsInExtraDeck
        let cardsInSideDeck

        if (rawDeck.creator.length === 0) {
            rawDeck.creator = "Undefined"
        }

        // ADD COUNTER HERE TO MODIFY WHEN CARD AMOUNT CHANGES 

        deckCreator.innerHTML = `
        ${deckPricer_deckCreator} : ${rawDeck.creator}
        <br>
        ${deckPricer_mainDeck} (${cardsInMainDeck})
        ${deckPricer_extraDeck} (${cardsInExtraDeck})
        ${deckPricer_sideDeck} (${cardsInSideDeck})
        <i class="bi bi-download greenText" onclick="downloadDeck(rawDeck, file.name, 'text')"></i>
          `
    }

    if (deck.mainDeck.length > 60 || deck.sideDeck.length > 15 || deck.extraDeck.length > 15) {
        alert("deck full!")
        return
    }

    if (deck.mainDeck.filter(x => x.name === card.name).length == 3 || deck.extraDeck.filter(x => x.name === card.name).length == 3 || deck.mainDeck.filter(x => x.name === card.name).length + deck.sideDeck.filter(x => x.name === card.name).length == 3 || deck.extraDeck.filter(x => x.name === card.name).length + deck.sideDeck.filter(x => x.name === card.name).length == 3) {
        alert('you cant add more than 3 copies of the same card')
        return
    }

    if (where == "deck_main") {
        if (deck.mainDeck.filter(card => card.name == card.name)) {
            if (card.type == "Fusion Monster" || card.type == "Synchro Monster" || card.type == "XYZ Monster" || card.type == "XYZ Pendulum Effect Monster" || card.type == "Synchro Pendulum Effect Monster" || card.type == "Link Monster" || card.type == "Pendulum Effect Fusion Monster") {
                deck.extraDeck.push(card)
                createDeckDuplicate(card, 'deck_extra')
            } else {
                console.log("adding duplcate")
                deck.mainDeck.push(card)
                createDeckDuplicate(card, where)
            }
        } else {
            if (card.type == "Fusion Monster" || card.type == "Synchro Monster" || card.type == "XYZ Monster" || card.type == "XYZ Pendulum Effect Monster" || card.type == "Synchro Pendulum Effect Monster" || card.type == "Link Monster" || card.type == "Pendulum Effect Fusion Monster") {
                deck.extraDeck.push(card)
                createDeckDuplicate(card, 'deck_extra')
            } else {
                console.log("adding card " + card)
                deck.mainDeck.push(card)
                createDeck(card, where)
            }
        }
    } else if (where == 'deck_side') {
        if (deck.sideDeck.filter(card => card.name == card)) {
            console.log("adding duplcate")
            deck.sideDeck.push(card)
            createDeckDuplicate(card, where)
        } else {
            console.log("adding card " + card)
            deck.sideDeck.push(card)
            createDeck(card, where)
        }
    }


}