var allCardNames = []

function searchCardNamesForAutocomplete() {

    for (let b = 0; b < allCards.data.length; b++) {
        allCardNames.push(allCards.data[b].name)
    }


    //  allCardNames = allCardNames.replace('-', ' ');

    allCardNames = [...new Set(allCardNames)];
    //  console.log(allCardNames)

}



function autocomplete(inp, arr) {

    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length && arr.length >= 30; i++) {
            // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            if (arr[i].substr(0, val.length).toUpperCase().includes(val.toUpperCase())) {
                b = document.createElement("DIV");

                let currentCard = allCards.data.filter(card => (card.name == arr[i].substr(0, val.length) + arr[i].substr(val.length)))

                if (deckPricerStatus == false) {
                    b.classList.add("simplecardinfo")
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                } else {
                    b.classList.remove("autocomplete-items")
                    b.classList.add("searchBarDeckPricerCard")
                    b.innerHTML = ` 
                    <i class='bi bi-plus-circle add2deckButton'></i>  
                    <i class='bi bi-plus-circle-dotted add2deckButton'></i>
                    <strong>
                        <div class="searchBarCard">
                            <div>
                                <div class="searchBarCard_image">
                                <!-- 
                                    <img src="${currentCard[0].card_images[0].image_url_small}" loading='lazy' id="img2_${currentCard[0].id}" alt="${currentCard[0].name}" class="smallCard" >
                                    </div>
                                -->
                            </div>
                            <div class="searchBardCard_info">
                                <div class="searchBarCard_Name">
                                ${arr[i].substr(0, val.length)+arr[i].substr(val.length)} 
                                //
                                ${currentCard[0].type}
                                </div>
                                <div class="searchBardCard_description">
                                    ${currentCard[0].desc}
                                </div>
                            </div>
                        </div>
                    </strong>`;
                }
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    // console.log(e.target.classList)
                    inp.value = this.getElementsByTagName("input")[0].value;
                    if (deckPricerStatus === false) {
                        closeAllLists();
                        searchCardsByNameOrDescription(inp.value)
                    } else {
                        let currentCard = allCards.data.filter(card => card.name == inp.value)
                        // console.log(currentCard)
                        if (e.target.className == 'bi bi-plus-circle add2deckButton') {
                            console.log('adding to main deck')
                            addCardToDeck(currentCard[0], 'deck_main')

                        } else if (e.target.className == 'bi bi-plus-circle-dotted add2deckButton') {
                            console.log("adding to side deck")
                            addCardToDeck(currentCard[0], 'deck_side')
                        }
                    }
                });
                a.appendChild(b);
            }
        }

    })

    ;

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");

        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            // WHAT HAPPENS IF DOWN KEY PRESSED
            currentFocus++;
            addActive(x);


        } else if (e.keyCode == 38) {
            // WHAT HAPPENS IF DOWN KEY PRESSED
            currentFocus--;
            addActive(x);

        } else if (e.keyCode == 39) {
            console.log("right key pressed! ")
            closeAllLists(e.target);

        } else if (e.keyCode == 13) {
            // WHAT HAPPENS IF ENTER IS PRESSED
            // console.log(addActive(x))
            // console.log("enter pressed, searching")
            closeAllLists(e.target)
            // console.log("Searching : "+cardName)

            var cardName = document.search.fname.value;
            // searchCards(cardName, searchedCards_H1_1, searchedCards_H1_2, noResultsWhenSearch_H1, noResultsWhenSearch_H2)


            if (currentFocus > -1) {
                if (x) x[currentFocus].click();

            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);

        x[currentFocus].classList.add("autocomplete-active");


    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {

        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    function simulateKey(view, keyCode, key) {
        let event = document.createEvent("Event")
        event.initEvent("keydown", true, true)
        event.keyCode = keyCode
        event.key = event.code = key
        return view.someProp("handleKeyDown", f => f(view, event))
    }


    document.addEventListener("click", function(e) {
        if (deckPricerStatus === true) {
            return
        } else {
            closeAllLists(e.target);
        }
        // console.log(e.target)
        // console.log("element clicked")


    });
}

autocomplete(document.getElementById("card_name"), allCardNames);