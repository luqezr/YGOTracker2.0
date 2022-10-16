// CREATE CARD

function createNormalCard(card){

  // console.log(card)


 
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
          <div class="cardInfo">
            <p class="cardName">${card.name}</p>
            <p class="cardSubTitle" id="cardSubTitle_${card.id}">
              <span class="cardArchetype" id="archetype_${card.id}" onclick="searchByArchetype('${card.archetype}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}"></span>
              <span> ID: ${card.id} </span>
              <span> Release Date: ${card.misc_info[0].ocg_date} </span>
              <br>
            </p>
            <p class="cardDescription">
              ${card.desc} 
            </p>
          </div>   
        </div>
      </div>
    </div>   
  </div>
  `


  // <span> Type: <img src="/media/icons.png" alt="cardType" class="${cardType}"></span>


  hasArchetype(`archetype_${card.id}`, card.archetype)
  whichRace(`cardSubTitle_${card.id}`, card.race, card)
  whichType(`cardSubTitle_${card.id}`, card.type, card)


}



// let levelOrRank =  


function hasArchetype (modalId, archetype) {

  if (archetype == undefined ) {
    // console.log("archetype undefined")
    document.getElementById(modalId).innerHTML = ``
      } else {
        // console.log("archetype is "+archetype)
        document.getElementById(`${modalId}`).innerHTML = `
        Archetype: <span style="cursor: pointer" >${archetype}</span>
        <br>
        <br>
        `
      }
}

 
function whichType (modalId, type, card) {
  let cardType = card.type.replace(/\s/g, '');
  if (type == "Spell Card" | type == "Trap Card" ) {
    // console.log("trap or magic card detected")
    if (type == "Spell Card") {
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite spellCard"></span> : ${card.type} </span>
          `
      } else if (type == "Trap Card"){
            document.getElementById(modalId).innerHTML += `
            <span> <span class="iconsSprite trapCard"></span> : ${card.type} </span>
            `
            }
      } else {
        // console.log("type is "+type)
        if (type == "Normal Monster"){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite normalMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Effect Monster"  || type == "Flip Effect Monster" || type == "Flip Effect Monster" ){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite effectMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Ritual Monster"  || type == "Ritual Effect Monster"){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite ritualMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Fusion Monster"){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite fusionMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Synchro Monster" || type == "Synchro Tuner Monster" ){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite synchroMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "XYZ Monster"){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite xyzMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Gemini Monster"){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite geminiMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Pendulum Effect Monster"  || type == "Pendulum Flip Effect Monster"  || type == "Pendulum Tuner Effect Monster" ){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "XYZ Pendulum Effect Monster" ){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumXyzMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Synchro Pendulum Effect Monster" ){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumSynchroMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Pendulum Effect Fusion Monster" ){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumFusionMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Link Monster"){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite linkMonster"></span> : ${card.type} </span>
          `
        }

        if (type == "Token"){
          document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite tokenMonster"></span> : ${card.type} </span>
          `
        }

        document.getElementById(modalId).innerHTML += `
        <span> Attribute: ${card.attribute} </span>
        <span> <span class="iconsSprite cardLevel"></span> : ${card.level} </span>
        <br>
        <span> <span class="iconsSprite cardAtk"></span> : ${card.atk} </span>
        <span> <span class="iconsSprite cardDef"></span> : ${card.def} </span>
        `

      }
}

function whichAttribute (modalId, type, card){
  let cardAttribute = card.attribute.replace(/\s/g, '');

}

function whichRace (modalId, race, card) {
  let cardRace = (card.race.replace(/\s/g, '')).toLowerCase().replace('-','');
  // console.log(cardRace)


  if (cardRace == "aqua"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite aqua"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "beast"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite beast"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "beastwarrior"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite beastWarrior"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "creatorgod"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite creatorGod"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "cyberse"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite cyberse"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "dinosaur"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite dinosaur"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "divinebeast"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite divineBeast"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "dragon"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite dragon"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "fairy"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fairy"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "fiend"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fiend"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "fish"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fish"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "insect"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite insect"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "machine"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite machine"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "plant"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite plant"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "psychic"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite psychic"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "pyro"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite pyro"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "reptile"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite reptile"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "rock"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite rock"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "seaserpent"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite seaSerpent"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "spellcaster"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite spellcaster"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "thunder"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite thunder"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "warrior"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite warrior"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "wingedbeast"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite wingedBeast"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "zombie"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite zombie"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "normal"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite normalSpell"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "continuous"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite continuous"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "quickplay"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite quickPlaySpell"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "ritual"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite ritualSpell"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "counter"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite counterTrap"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "equip"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite equipTrap"></span> : ${card.race} </span>
    `
  }

  if (cardRace == "field"){
    document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fieldSpell"></span> : ${card.race} </span>
    `
  }



}
