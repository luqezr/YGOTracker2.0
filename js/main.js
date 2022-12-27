// var initializations
var lang;
var allCards; //reply from the query for the cards
var allSets; //reply from the query for the sets
var thisSet; // Cards for the searched set
var setsStatus = false; //show true for load more sets button
var currentCards; // cards filtered by x format
var ygoorgCard; //query from yugiohorganization
var query;
var filteredQueryResults;
var currentFilteredResults;
var filteredSets;
var filteredStaples;
var titlesSection = document.getElementById("titlesSection");
var cardsSection = document.getElementById("cardsSection");
var cardIndex;
var resultsPerPage = 24;
var setsPerPage = 24;
var printedResults = resultsPerPage;
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
            printSets(setsPerPage, allSets, text_allSets1 + '<span class="greenText">' + allSets.length + '</span>' + text_allSets2)

        })

        .catch((error) => {
            console.log("ups 😢 " + error);
            return;
            // Code for handling the error
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
            console.log(ygoorgCard)
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

    resetCurrentCards()
    currentCards = allCards.data.filter((card) => card[field] === value)
    // console.log(filteredCards)
}

// SEARCH BY SOME VALUE, FOR EXAMPLE
// searchByExactValue("archetype", "Branded") 
// WILL SEARCH "ARCHETYPES" THAT ARE EQUAL TO "BRANDED"

function searchByArchetype(value) {

    window.scrollTo(0, 0);
    printedResults = resultsPerPage
    resetCurrentCards()
    searchByExactValue("archetype", value)
    printCards(currentCards.length, currentCards, '<span class="greenText">' + currentCards.length + '</span>', text_Archetype1 + '<span class="purpleText">' + value + '</span> ', text_Archetype2)



}

// FIND BY SET 

function searchBySet(set_name) {

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

function searchByFormat(format) {
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

    printCards(resultsPerPage, thisFormat, '<span class="greenText">' + thisFormat.length + '</span>' + text_FormatResults1, '<span class="purpleText">' + format + '</span>', text_FormatResults2)

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
    filteredSets = currentCards.filter(f => f.set_name.toLowerCase().startsWith(letter.toLowerCase()))

    printSets(filteredSets.length, filteredSets, 'Sets starting with <span class="purpleText">' + letter + ' </span>')

    // console.log(filterSets)

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

function printSets(howMany, sets, title) {

    setsStatus = true
    cardsSection.innerHTML = ("")
    let cards2print = []
    cards2print = sets

    titlesSection.innerHTML = title
    // console.log(cards2print)

    cardsSection.innerHTML += `
            <h2 class='setLetters'>

                    <span onclick="filterSets('A')"> A </span>
                    <span onclick="filterSets('B')"> B </span>
                    <span onclick="filterSets('C')"> C </span>
                    <span onclick="filterSets('D')"> D </span>
                    <span onclick="filterSets('F')"> F </span>
                    <span onclick="filterSets('G')"> G </span>
                    <span onclick="filterSets('H')"> H </span>
                    <span onclick="filterSets('I')"> I </span>
                    <span onclick="filterSets('J')"> J </span>
                    <span onclick="filterSets('K')"> K </span>
                    <span onclick="filterSets('L')"> L </span>
                    <span onclick="filterSets('M')"> M </span>
                    <span onclick="filterSets('N')"> N </span>
                    <span onclick="filterSets('O')"> O </span>
                    <span onclick="filterSets('P')"> P </span>
                    <span onclick="filterSets('Q')"> Q </span>
                    <span onclick="filterSets('R')"> R </span>
                    <span onclick="filterSets('S')"> S </span>
                    <span onclick="filterSets('T')"> T </span>
                    <span onclick="filterSets('U')"> U </span>
                    <span onclick="filterSets('V')"> V </span>
                    <span onclick="filterSets('W')"> W </span>
                    <span onclick="filterSets('X')"> X </span>
                    <span onclick="filterSets('Y')"> Y </span>
                    <span onclick="filterSets('Z')"> Z </span>
            
            </h2>`



    for (let i = 0; i < howMany; i++) {
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
    jQuery(`#cardName_${id}`).detach().appendTo(`#cardHeader_${id}`)
    jQuery(`#cardSubTitle_${id}`).detach().appendTo(`#cardHeader_${id}`)

}


// #######################################################################

// LOAD MORE CARDS RESULTS

function printMoreResults(howMany) {

    // AGREGAR VERIFICACION CON URL, CUANDO SEA /SETS sets=true
    if (setsStatus == true) {
        for (let i = printedResults;
            // (i < printedResults + howMany && i < currentCards.length); i++) {
            i < printedResults + howMany; i++) {

            try {
                createSet(currentCards[i])
            } catch (error) {
                // console.error(error);
                console.log("No more sets!")
                return
            }

            printedResults = printedResults + howMany

        }


    } else {

        for (let i = printedResults;
            // (i < printedResults + howMany); i++) {
            i < printedResults + howMany; i++) {
            try {
                createNormalCard(currentCards[i])
            } catch (error) {
                // console.error(error);
                console.log("No more cards!")

            }


        }

        printedResults = printedResults + howMany


    }


    console.log(printedResults)

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


// #######################################################################

function filterStaples(letter) {
    filteredStaples = currentCards.filter(f => f.name.toLowerCase().startsWith(letter.toLowerCase()))
    currentCards = filteredStaples
    printCards(resultsPerPage, filteredStaples, 'Staples starting with <span class="purpleText">' + letter + ' </span>', filteredStaples.length + " cards")

    // console.log(filterSets)
    // FUNCIONA PERO HABRIA QUE AGREGAR EL FILTRO DE LETRAS PARA LAS staples, YA QUE AL CREARLAS NO LO VUELVE A PONER 

}

// Print Staples

function printStaples() {
    currentCards = staples
    titlesSection.innerHTML = "<span class='greenText'>" + currentCards.length + " </span> staple cards"
    cardsSection.innerHTML = ("")

    cardsSection.innerHTML += `
    <h2 class='setLetters'>

            <span onclick="filterStaples('A')"> A </span>
            <span onclick="filterStaples('B')"> B </span>
            <span onclick="filterStaples('C')"> C </span>
            <span onclick="filterStaples('D')"> D </span>
            <span onclick="filterStaples('F')"> F </span>
            <span onclick="filterStaples('G')"> G </span>
            <span onclick="filterStaples('H')"> H </span>
            <span onclick="filterStaples('I')"> I </span>
            <span onclick="filterStaples('J')"> J </span>
            <span onclick="filterStaples('K')"> K </span>
            <span onclick="filterStaples('L')"> L </span>
            <span onclick="filterStaples('M')"> M </span>
            <span onclick="filterStaples('N')"> N </span>
            <span onclick="filterStaples('O')"> O </span>
            <span onclick="filterStaples('P')"> P </span>
            <span onclick="filterStaples('Q')"> Q </span>
            <span onclick="filterStaples('R')"> R </span>
            <span onclick="filterStaples('S')"> S </span>
            <span onclick="filterStaples('T')"> T </span>
            <span onclick="filterStaples('U')"> U </span>
            <span onclick="filterStaples('V')"> V </span>
            <span onclick="filterStaples('W')"> W </span>
            <span onclick="filterStaples('X')"> X </span>
            <span onclick="filterStaples('Y')"> Y </span>
            <span onclick="filterStaples('Z')"> Z </span>
    
    </h2>`

    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + staples + "&misc=yes&sort=name")
        .then(cardInfo => cardInfo.json())
        .then(data => {
            //console.log(data);
            currentCards = data.data;


            for (b = 0; b < staples.length; b++) {
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
    if (window.scrollY + window.innerHeight >= loadHeight) {
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



    for (let checkbox of markedCheckboxType) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            filteredQueryResults = currentCards.filter(card => card.type == checkbox.value)
            currentFilteredResults = currentFilteredResults.concat(filteredQueryResults)
        }
    }

    for (let checkbox of markedCheckboxAttribute) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            filteredQueryResults = currentCards.filter(card => card.attribute == checkbox.value)
            currentFilteredResults = currentCards.concat(filteredQueryResults)
        }

    }

    for (let checkbox of markedCheckboxLevel) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            filteredQueryResults = currentCards.filter(card => (card.level == checkbox.value) || (card.linkval == checkbox.value))
            currentFilteredResults = currentCards.concat(filteredQueryResults)

        }
    }


    for (let checkbox of markedCheckboxRace) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            filteredQueryResults = currentCards.filter(card => card.race == checkbox.value)
            currentFilteredResults = currentCards.concat(filteredQueryResults)

        }
    }


}

function runFilters() {


    let descForm = document.getElementById('descForm').value
    let atkForm = document.getElementById('atkForm').value
    let defForm = document.getElementById('defForm').value
    // console.log(descForm)
    // console.log(atkForm)
    // console.log(defForm)
    if (descForm != '') {

        if (currentFilteredResults != undefined) {
            filteredQueryResults = currentFilteredResults.filter((card) =>
                `${card.name.toLowerCase()} ${card.desc.toLowerCase()}`.includes(descForm));
        } else {
            filteredQueryResults = currentCards.filter((card) =>
                `${card.name.toLowerCase()} ${card.desc.toLowerCase()}`.includes(descForm));
            currentCards = filteredQueryResults
        }
    }

    if (atkForm != '') {
        filteredQueryResults = currentCards.filter(card => card.atk == atkForm)
        currentCards = filteredQueryResults
    }

    if (defForm != '') {
        filteredQueryResults = currentCards.filter(card => card.def == defForm)
        currentCards = filteredQueryResults
    }



}

document.getElementById('filterButton').onclick = function() {
    // when adding other formats this value should be changed to whatever the format is 
    currentCards = allCards.data
    currentFilteredResults = []
    getCheckboxValues()
    runFilters()
    resetFilters()
    currentCards = currentFilteredResults
    if (currentCards == undefined) {
        currentCards = allCards.data
    }
    printCards(resultsPerPage, currentCards, '<span class="purpleText">' + currentCards.length + ' </span> cards fit your criteria ', "", "")

}