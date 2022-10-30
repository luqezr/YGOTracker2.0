// CREATE CARD

function createNormalCard(card, view) {

    // console.log(card)

    if (view) {
        cardsSection.innerHTML += `
            <div class="modal-body aloneCard" data-bs-toggle="modal" data-bs-target="#card_${card.id}">
            <div class="cardHeader">
            <img src="${card.card_images[0].image_url}" alt="${card.name}" >
            </div>
            <div class="cardInfo  scrollspy">
              <p class="cardName">${card.name}</p>
              <p class="cardSubTitle" id="cardSubTitle_${card.id}">
                <span class="cardArchetype" id="archetype_${card.id}" onclick="searchByArchetype('${card.archetype}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}" style="cursor: pointer"></span>
                <br>
                <span> ID : ${card.id} </span>
                <br>
                <span id"releaseDate_${card.id}"> OCG Release Date : ${card.misc_info[0].ocg_date} </span>
                <br>
                <span id="releaseDateTCG_${card.id}"> </span>
                <br>
              </p>
              <p class="cardDescription">
                ${card.desc} 
              </p>
              <p class="cardSets scrollspy" data-spy="scroll" id="cardSets_${card.id}">
              </p>
            </div>   

    `

    } else {



        cardsSection.innerHTML += `
  <div class="card" data-bs-toggle="modal" data-bs-target="#card_${card.id}" > 
  <img src="${card.card_images[0].image_url}" alt="${card.name}" >
  </div>

  <div class="modal fade" id="card_${card.id}" tabindex="-1" aria-labelledby="card_${card.id}" aria-hidden="true" data-bs-toggle="modal" data-bs-target="#card_${card.id}">
    <div class="modal-dialog">
      <div class="modal-content" >
        <div class="modal-body" data-bs-toggle="modal" data-bs-target="#card_${card.id}">
          <div class="cardHeader">
          <img src="${card.card_images[0].image_url}" alt="${card.name}" >
          </div>
          <div class="cardInfo  scrollspy">
            <p class="cardName">${card.name}</p>
            <p class="cardSubTitle" id="cardSubTitle_${card.id}">
              <span class="cardArchetype" id="archetype_${card.id}" onclick="searchByArchetype('${card.archetype}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}" style="cursor: pointer"></span>
              <br>
              <span> ID : ${card.id} </span>
              <br>
              <span id"releaseDate_${card.id}"> OCG Release Date : ${card.misc_info[0].ocg_date} </span>
              <br>
              <span id="releaseDateTCG_${card.id}"> </span>
              <br>
            </p>
            <p class="cardDescription">
              ${card.desc} 
            </p>
            <p class="cardSets scrollspy" data-spy="scroll" id="cardSets_${card.id}">
            </p>
          </div>   
        </div>
      </div>
    </div>   
  </div>
  `

    }


    // <span> Type <img src="/media/icons.png" alt="cardType" class="${cardType}"></span>


    hasArchetype(`archetype_${card.id}`, card.archetype)
    if (card.attribute) {
        whichAttribute(`cardSubTitle_${card.id}`, card.attribute, card)
    } else {
        document.getElementById(`cardSets_${card.id}`).innerHTML = `No prints for this card in TCG yet. `
    }
    whichRace(`cardSubTitle_${card.id}`, card.race, card)
    whichType(`cardSubTitle_${card.id}`, card.type, card)

    if (card.card_sets) {
        printCardSets(`cardSets_${card.id}`, card)
    }

    // hasTcgReleaseDate(`releaseDate_${card.id}`, card)

}


// let levelOrRank =  


function hasArchetype(modalId, archetype) {

    if (archetype == undefined) {
        // console.log("archetype undefined")
        document.getElementById(modalId).innerHTML = ``
    } else {
        // console.log("archetype is "+archetype)
        document.getElementById(`${modalId}`).innerHTML = `
        Archetype <span style="cursor pointer">${archetype}</span>
        `
    }
}

function hasTcgReleaseDate(modalId, card) {
    if (card.misc_info[0].tcg_date) {
        document.getElementById(`releaseDate_${modalId}`).innerHTML = `
    // TCG Release Date : ${card.misc_info[0].tcg_date}
    `
    }
}


function whichType(modalId, type, card) {
    let cardType = card.type.replace(/\s/g, '');
    if (type == "Spell Card" | type == "Trap Card") {
        // console.log("trap or magic card detected")
        if (type == "Spell Card") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite spellCard"></span> ${card.type} </span>
          `
        } else if (type == "Trap Card") {
            document.getElementById(modalId).innerHTML += `
            <span> <span class="iconsSprite trapCard"></span> ${card.type} </span>
            `
        }
    } else {
        // console.log("type is "+type)
        if (type == "Normal Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite normalMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Effect Monster" || type == "Flip Effect Monster" || type == "Flip Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite effectMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Ritual Monster" || type == "Ritual Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite ritualMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Fusion Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite fusionMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Synchro Monster" || type == "Synchro Tuner Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite synchroMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "XYZ Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite xyzMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Gemini Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite geminiMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Pendulum Effect Monster" || type == "Pendulum Flip Effect Monster" || type == "Pendulum Tuner Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "XYZ Pendulum Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumXyzMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Synchro Pendulum Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumSynchroMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Pendulum Effect Fusion Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumFusionMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Link Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite linkMonster"></span>  ${card.type} </span>
          `
        }

        if (type == "Token") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite tokenMonster"></span>  ${card.type} </span>
          `
        }

        document.getElementById(modalId).innerHTML += `
        <span> <span class="iconsSprite cardLevel"></span>  ${card.level} </span>
        <br>
        <span> <span class="iconsSprite cardAtk"></span>  ${card.atk} </span>
        <span> <span class="iconsSprite cardDef"></span>  ${card.def} </span>
        `

    }
}

function whichAttribute(modalId, attribute, card) {
    let cardAttribute = card.attribute.toLowerCase();
    // console.log(cardRace)


    if (cardAttribute == "light") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite light"></span>  ${card.attribute} </span>
    `
    }

    if (cardAttribute == "dark") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite dark"></span>  ${card.attribute} </span>
    `
    }

    if (cardAttribute == "water") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite water"></span>  ${card.attribute} </span>
    `
    }

    if (cardAttribute == "fire") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fire"></span>  ${card.attribute} </span>
    `
    }

    if (cardAttribute == "earth") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite earth"></span>  ${card.attribute} </span>
    `
    }

    if (cardAttribute == "wind") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite wind"></span>  ${card.attribute} </span>
    `
    }

    if (cardAttribute == "divine") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite divine"></span>  ${card.attribute} </span>
    `
    }

    if (cardAttribute == "spell") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite spell"></span>  ${card.attribute} </span>
    `
    }

    if (cardAttribute == "trap") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite trap"></span>  ${card.attribute} </span>
    `
    }

}

function whichRace(modalId, race, card) {
    let cardRace = (card.race.replace(/\s/g, '')).toLowerCase().replace('-', '');
    // console.log(cardRace)


    if (cardRace == "aqua") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite aqua"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "beast") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite beast"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "beastwarrior") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite beastWarrior"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "creatorgod") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite creatorGod"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "cyberse") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite cyberse"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "dinosaur") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite dinosaur"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "divinebeast") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite divineBeast"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "dragon") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite dragon"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "fairy") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fairy"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "fiend") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fiend"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "fish") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fish"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "insect") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite insect"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "machine") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite machine"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "plant") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite plant"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "psychic") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite psychic"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "pyro") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite pyro"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "reptile") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite reptile"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "rock") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite rock"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "seaserpent") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite seaSerpent"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "spellcaster") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite spellcaster"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "thunder") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite thunder"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "warrior") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite warrior"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "wingedbeast") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite wingedBeast"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "wyrm") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite wyrm"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "zombie") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite zombie"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "normal") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite normalSpell"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "continuous") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite continuous"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "quickplay") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite quickPlaySpell"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "ritual") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite ritualSpell"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "counter") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite counterTrap"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "equip") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite equipTrap"></span>  ${card.race} </span>
    `
    }

    if (cardRace == "field") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fieldSpell"></span>  ${card.race} </span>
    `
    }



}


function printCardSets(modalId, card) {


    // console.log(card.card_sets.length)

    document.getElementById(modalId).innerHTML = `
          <table class="table table-bordered" >
          <thead>
            <tr>
              <th scope="col">Set</th>
              <th scope="col">Rarity</th>
              <th scope="col">Set Code</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="AVG Means average price for that card of that specific set, the price is expresed in US dolars">AVG* Price</th>
            </tr>
          </thead>
          
          <tbody id="table_${modalId}">

          </tbody>
        </table>
        `

    for (let i = 0; i <= (card.card_sets.length - 1); i++) {

        // console.log(card.card_sets[i])

        document.getElementById(`table_${modalId}`).innerHTML += `
           <tr>
             <th scope="row"  class="cardSet" id="set_${card.id}" onclick="findBySet('${card.card_sets[i].set_name}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}" style="cursor: pointer">${card.card_sets[i].set_name}</th>
             <td>${card.card_sets[i].set_rarity_code} ${card.card_sets[i].set_rarity}</td>
             <td> ${card.card_sets[i].set_code}</td>
             <td>$${card.card_sets[i].set_price}</td>
           </tr>
    
    `
    }

}


function createSet(sets) {

    let setName = sets.set_name
    let setCode = sets.set_code
    let setDate = sets.tcg_date
    let setQuantity = sets.num_of_cards

    let setImage = setName.replace(/ /g, "_");
    setImage = setImage.replace(/:/g, "_");
    setImage = setImage.replace(/-/g, "_");


    cardsSection.innerHTML += `
        <div class="sets" id='${setCode}' >
          <div class="setGrid" >

            <div class="setImage"> 
            <div class='cardInfo'>
            <span><h5 class="purpleText"><a  style="cursor: pointer" id="${setCode}" class='getBySet'  onclick="findBySet('${setName}')" > ${setName} </a><br>${setQuantity} // ${setCode} //  ${setDate}</h5></span> 
            </div>
              <button type="button" class="btn" data-toggle="modal" data-target="#ModalID${setCode}">
                <img src="https://static-7.studiobebop.net/ygo_data/set_images/${setImage}.jpg" onerror="this.src='error.gif';this.onerror='';" class="card-img-bottom setImages" id='${setName}'  alt="set Image" srcset=""> 
            
              </button>
            </div>

          
          

            <div class="modal fade modalCardImage" id="ModalID${setCode}" class="close" data-dismiss="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content modalImage">
                  
                  <img src="https://static-7.studiobebop.net/ygo_data/set_images/${setImage}.jpg" onerror="this.src='error.gif';this.onerror='';" class="card-img-bottom setImages" id='${setName}' alt="${setName}" class="close" data-dismiss="modal">

                </div>
              </div>
            </div>

          </div>
        </div>
	
  `
}