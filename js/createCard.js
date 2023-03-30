// CREATE CARD

function createNormalCard(card, view) {
    // console.log(card)
    // let desc = card.desc.replace(/\./g, '. <br/>');

    let desc = card.desc
        .replace('once per turn.', 'once per turn.<br/> ')
        .replace('----------------------------------------', ' ')
        .replace('[ Pendulum Effect ]', ' [ Pendulum Effect ] <br/> ')
        .replace('[ Monster Effect ]', '<br/> [ Monster Effect ] <br/> ')
        // .replace('. [', '.<br/> [')
        .replace('.)', '.) <br/>')
        // .replace('●', '<br/> ● ')
        .replace('. ●', '.<br/> ● ')
        .replace('.●', '.<br/> ● ')
        .replace('<br/> <br/>', '<br/>')
        .replace('.<br/> <br/>', '<br/>')





    let nextCard = currentCards[getIndex(card.id, "right")]
    let previousCard


    if (getIndex(card.id, "right") == 1 || previousCard == undefined) {
        // console.log("no previous card")
        previousCard = card
    } else {
        previousCard = currentCards[getIndex(card.id, "left")]
    }

    if (currentCards[getIndex(card.id, "right")] == undefined) {
        console.log("no next card")
        nextCard = card
    }
    // console.log(previousCard)
    // console.log(nextCard)


    if (view == 'aloneCard') {
        cardsSection.innerHTML += `        
        <div class="modal-content " >
        <div class="modal-body " id="aloneCard">
          <div class="cardHeader" id="cardHeaderDiv_${card.id}" data-bs-toggle="modal" data-bs-target="#card_${card.id}">
            <div> 
            <img src="${card.card_images[0].image_url}" loading='lazy' id="img_${card.id}" alt="${card.name}"  >
            </div>
            <div id="cardHeader_${card.id}"> </div>
          </div>
          <div class="cardInfo  scrollspy">
              <span class="cardName" >
              <span id="cardName_${card.id}">
              <p id="name_${card.id}">${card.name.toUpperCase()}</p>
              </span>
            </span>
            <p class="cardSubTitle" id="cardSubTitle_${card.id}">
              <span class="cardArchetype" id="archetype_${card.id}" onclick="load(searchByArchetype,'${card.archetype}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}" style="cursor: pointer"> </span>
              <span> ID : ${card.id} </span>
              <br>
              <span id="releaseDateOCG_${card.id}"> </span>
              <span id="releaseDateTCG_${card.id}"> </span>
              <span id="betaName_${card.id}">  </span>
            </p>
            <p class="cardDescription" id="description_${card.id}">
              ${desc} 
            </p>
            <p class="cardFormats"> 
            <a href='https://yugipedia.com/wiki/${card.id}' target="_blank" class='greenText'> Yugipedia </a> / 
            <a href='https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${card.misc_info[0].konami_id}' target="_blank" class='greenText'> Konami Database </a> / 
            <a href='https://db.ygorganization.com/card#${card.misc_info[0].konami_id}' target="_blank" class='greenText'> Card Rulings </a>
            <br>
            <span id='cardFormats_${card.id}' class="cardFormats">Card Formats :</span>
            </p>

            <span class="languageBar" >
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'es' )"> ES </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'en' )"> EN </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'de' )"> DE </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'fr' )"> FR </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'it' )"> IT </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'ja' )"> JA </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'ko' )"> KO </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'pt' )"> PT </i>
            </span>
            
            <br>
            <p class="cardSets scrollspy" data-spy="scroll" id="cardSets_${card.id}">
            <br>
            </p>
          </div>   

        </div>
      </div>


    `

    } else if (view == 'banSection' || view == 'limitedSection' || view == 'semiLimitedSection') {
        document.getElementById(view).innerHTML += `
  <div class="smallcard" data-bs-toggle="modal" data-bs-target="#card_${card.id}" "style="cursor: pointer"> 
  <img src="${card.card_images[0].image_url}" loading='lazy' id="img2_${card.id}" alt="${card.name}" class="smallCard" >
  </div>

  <div  class="modal fade" id="card_${card.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" id="thisCard_${card.id}">
      <div class="modal-content" >
        <div class="modal-body"  >
          <div class="cardHeader">
            <div class="cardHeaderDiv" id="cardHeaderDiv_${card.id}"> 
            <i class="bi bi-caret-left arrowsMobile" id="previousCard_${card.id}" class="card" data-bs-toggle="modal"  data-bs-target="#card_${previousCard.id}" ></i>
            <img src="${card.card_images[0].image_url}" loading='lazy' id="img_${card.id}" alt="${card.name}"  data-bs-toggle="modal" data-bs-target="#card_${card.id}"  >
            <i class="bi bi-caret-right arrowsMobile" id="nextCard_${card.id}" class="card" data-bs-toggle="modal"  data-bs-target="#card_${nextCard.id}"  ></i>
            <div class="cardArrows">
                <i class="bi bi-caret-left"  class="card arrowsDesktop" id="previousCard_${card.id}" data-bs-toggle="modal"  data-bs-target="#card_${previousCard.id}" ></i>
                <i class="bi bi-caret-right" class="card arrowsDesktop" id="nextCard_${card.id}" data-bs-toggle="modal"  data-bs-target="#card_${nextCard.id}" ></i>
            </div>
            </div>
            <div id="cardHeader_${card.id}"> </div>
          </div>
          <div class="cardInfo  scrollspy">
              <span class="cardName" >
              <span id="cardName_${card.id}">
              <p id="name_${card.id}">${card.name.toUpperCase()}</p>
              </span>
            </span>
            <p class="cardSubTitle" id="cardSubTitle_${card.id}">
              <span class="cardArchetype" id="archetype_${card.id}" onclick="load(searchByArchetype,'${card.archetype}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}" style="cursor: pointer"> </span>
              <span> ID : ${card.id} </span>
              <br>
              <span id="releaseDateOCG_${card.id}"> </span>
              <span id="releaseDateTCG_${card.id}"> </span>
              <span id="betaName_${card.id}"> </span>
            </p>
            <p class="cardDescription" id="description_${card.id}">
              ${desc} 
            </p>
            <p class="cardFormats"> 
            <a href='https://yugipedia.com/wiki/${card.id}' target="_blank" class='greenText'> Yugipedia </a> / 
            <a href='https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${card.misc_info[0].konami_id}' target="_blank" class='greenText'> Konami Database </a> / 
            <a href='https://db.ygorganization.com/card#${card.misc_info[0].konami_id}' target="_blank" class='greenText'> Card Rulings </a>
            <br>
            <span id='cardFormats_${card.id}' class="cardFormats">Card Formats :</span>
            </p>

            <span class="languageBar" >
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'es' )"> ES </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'en' )"> EN </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'de' )"> DE </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'fr' )"> FR </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'it' )"> IT </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'ja' )"> JA </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'ko' )"> KO </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'pt' )"> PT </i>
            </span>
            
            <br>
            <p class="cardSets scrollspy" data-spy="scroll" id="cardSets_${card.id}">
            <br>
            </p>
          </div>   

        </div>
      </div>
    </div>   
  </div>
  `
    } else {



        cardsSection.innerHTML += `
  <div class="card"data-bs-toggle="modal" data-bs-target="#card_${card.id}" "style="cursor: pointer"> 
  <img src="${card.card_images[0].image_url}" loading='lazy' id="img2_${card.id}" alt="${card.name}" >
  </div>

  

  <div  class="modal fade" id="card_${card.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" id="thisCard_${card.id}">
      <div class="modal-content" >
        <div class="modal-body"  >
          <div class="cardHeader">
            <div class="cardHeaderDiv" id="cardHeaderDiv_${card.id}"> 
            <i class="bi bi-caret-left arrowsMobile" id="previousCard_${card.id}" class="card" data-bs-toggle="modal"  data-bs-target="#card_${previousCard.id}" ></i>
            <img src="${card.card_images[0].image_url}" id="img_${card.id}" alt="${card.name}" loading='lazy' data-bs-toggle="modal" data-bs-target="#card_${card.id}"  >
            <i class="bi bi-caret-right arrowsMobile" id="nextCard_${card.id}" class="card" data-bs-toggle="modal"  data-bs-target="#card_${nextCard.id}"  ></i>
            <div class="cardArrows">
                <i class="bi bi-caret-left"  class="card arrowsDesktop" id="previousCard_${card.id}" data-bs-toggle="modal"  data-bs-target="#card_${previousCard.id}" ></i>
                <i class="bi bi-caret-right" class="card arrowsDesktop" id="nextCard_${card.id}" data-bs-toggle="modal"  data-bs-target="#card_${nextCard.id}" ></i>
            </div>
            </div>
            <div id="cardHeader_${card.id}"> </div>
          </div>
          <div class="cardInfo  scrollspy">
              <span class="cardName" >
              <span id="cardName_${card.id}">
              <p id="name_${card.id}">${card.name.toUpperCase()}</p>
              </span>
            </span>
            <p class="cardSubTitle" id="cardSubTitle_${card.id}">
              <span class="cardArchetype" id="archetype_${card.id}" onclick="load(searchByArchetype,'${card.archetype}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}" style="cursor: pointer"> </span>
              <span> ID : ${card.id} </span>
              <br>
              <span id="releaseDateOCG_${card.id}"> </span>
              <span id="releaseDateTCG_${card.id}"> </span>
              <span id="betaName_${card.id}"> </span>
            </p>
            <p class="cardDescription" id="description_${card.id}">
              ${desc} 
            </p>
            <p class="cardFormats"> 
            <a href='https://yugipedia.com/wiki/${card.id}' target="_blank" class='greenText'> Yugipedia </a> / 
            <a href='https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${card.misc_info[0].konami_id}' target="_blank" class='greenText'> Konami Database </a> / 
            <a href='https://db.ygorganization.com/card#${card.misc_info[0].konami_id}' target="_blank" class='greenText'> Card Rulings </a>
            <br>
            <span id='cardFormats_${card.id}' class="cardFormats">Card Formats :</span>
            </p>

            <span class="languageBar" >
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'es' )"> ES </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'en' )"> EN </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'de' )"> DE </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'fr' )"> FR </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'it' )"> IT </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'ja' )"> JA </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'ko' )"> KO </i><span > / </span> 
            <i class="bi bi-translate greenText" onclick="queryYGOrg(${card.id}, ${card.misc_info[0].konami_id}, 'pt' )"> PT </i>
            </span>
            
            <br>
            <p class="cardSets scrollspy" data-spy="scroll" id="cardSets_${card.id}">
            <br>
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
    checkBanStatus(`cardName_${card.id}`, card)
    levelOrRankOrLink(`cardName_${card.id}`, card)
    checkPendulumScales(`cardName_${card.id}`, card)
    if (card.attribute) {
        whichAttribute(`cardName_${card.id}`, card)
    }
    whichRace(`cardName_${card.id}`, card.race, card)
    whichType(`cardName_${card.id}`, card.type, card)

    if (card.card_sets) {
        printCardSets(`cardSets_${card.id}`, card)
    } else {
        document.getElementById(`cardSets_${card.id}`).innerHTML = `<span> No prints for this card in TCG yet. </span>`
    }
    hasOcgReleaseDate(card.id, card)
    hasTcgReleaseDate(card.id, card)
    checkCardFormats(card)
    hasAlternativeArt(card.id, card)

    // CHECK RESOLUTION 
    if (window.screen.width < 400) {
        changeResolution(card.id)
    }

    correctCardImage(card.id)
    checkBetaName(card)

}

function checkBetaName(card) {

    if (card.misc_info[0].beta_name) {
        document.getElementById(`betaName_${card.id}`).innerHTML += `Beta Name: ${card.misc_info[0].beta_name}`
    }

}

function checkCardFormats(card) {

    for (let i = 0; i < card.misc_info[0].formats.length; i++) {

        document.getElementById(`cardFormats_${card.id}`).innerHTML += `<span class='cardFormat greenText' id="format_${card.id}" onclick="load(searchByFormat,'${card.misc_info[0].formats[i]}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}" style="cursor: pointer"> ${card.misc_info[0].formats[i]} </span>`

        if (i < card.misc_info[0].formats.length && i < (card.misc_info[0].formats.length - 1)) {
            document.getElementById(`cardFormats_${card.id}`).innerHTML += `/`
        }

    }
}

function checkPendulumScales(modalId, card) {
    // console.log("needs working")
    if (card.type.includes('Pendulum')) {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite penScaleLeft"></span>  ${card.scale} <span class="iconsSprite penScaleRight"></span> </span>
    `
    }
}

function levelOrRankOrLink(modalId, card) {
    if (card.type == "Link Monster") {
        // console.log("link here")
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite linkRate"></span>  ${card.linkval} </span>
    `
    } else if (card.type == "XYZ Monster" || card.type == "XYZ Pendulum Effect Monster") {
        // console.log("xyz here")
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite cardRank"></span>  ${card.level} </span>
    `
    } else if (card.level) {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite cardLevel"></span>  ${card.level} </span>
    `
    }

}

function checkBanStatus(modalId, card) {
    if (card.banlist_info) {
        if (card.banlist_info.ban_tcg) {
            // console.log(card.banlist_info.ban_tcg)
            document.getElementById(modalId).innerHTML += `
      <span> <span class="iconsSprite ${card.banlist_info.ban_tcg.toLowerCase() }"></span>  ${card.banlist_info.ban_tcg.toUpperCase()} </span>
      `
        } else {
            document.getElementById(modalId).innerHTML += ` 
      <span> <span class="iconsSprite unlimited"></span> UNLIMITED </span>
      `
        }
    } else {

        document.getElementById(modalId).innerHTML += ` 
      <span> <span class="iconsSprite unlimited"></span> UNLIMITED </span>
      `
    }
}

function hasArchetype(modalId, archetype) {

    if (archetype == undefined) {
        // console.log("archetype undefined")
        document.getElementById(modalId).innerHTML = ``
    } else {
        // console.log("archetype is "+archetype)
        document.getElementById(`${modalId}`).innerHTML = `
        Archetype : <span style="cursor pointer">${archetype} </span> / `
    }
}

function hasOcgReleaseDate(modalId, card) {
    if (card.misc_info[0].ocg_date) {
        document.getElementById(`releaseDateOCG_${modalId}`).innerHTML = `
   OCG Release Date : ${card.misc_info[0].ocg_date}
  `
    }
}

function hasTcgReleaseDate(modalId, card) {
    if (card.misc_info[0].ocg_date && card.misc_info[0].tcg_date) {
        document.getElementById(`releaseDateTCG_${modalId}`).innerHTML = ` / `
    }

    if (card.misc_info[0].tcg_date) {
        document.getElementById(`releaseDateTCG_${modalId}`).innerHTML += `
   TCG Release Date : ${card.misc_info[0].tcg_date}
  `
    }
}


function whichType(modalId, type, card) {
    let cardType = card.type.replace(/\s/g, '');
    if (type == "Spell Card" || type == "Trap Card" || type == "Skill Card") {
        // console.log("trap or magic card detected")
        if (type == "Spell Card") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite spellCard"></span> ${card.type.toUpperCase()} </span>
          `
        } else if (type == "Trap Card") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite trapCard"></span> ${card.type.toUpperCase()} </span>
          `
        } else if (type == "Skill Card") {
            // console.log("skill card")
            document.getElementById(modalId).innerHTML += `
            <span> <span class="iconsSprite skillCard"></span> ${card.type.toUpperCase()}  : ${card.race.toUpperCase()} </span>
            
            `
        }
    } else {
        // console.log("type is "+type)
        if (type == "Toon Monster") {
            document.getElementById(modalId).innerHTML += `
        <span> <span class="iconsSprite toonMonster"></span>  TOON </span>
        `
            if (card.misc_info[0].has_effect == 1) {
                document.getElementById(modalId).innerHTML += `  
        <span> <span class="iconsSprite effectMonster"></span>  EFFECT MONSTER </span>
         `
            }
        }

        if (type == "Normal Monster") {
            document.getElementById(modalId).innerHTML += `
        <span> <span class="iconsSprite normalMonster"></span>  ${card.type.toUpperCase()} </span>
        `
        }

        if (type == "Effect Monster" || type == "Flip Effect Monster" || type == "Flip Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite effectMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "Ritual Monster" || type == "Ritual Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite ritualMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "Fusion Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite fusionMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "Synchro Monster" || type == "Synchro Tuner Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite synchroMonster"></span> <span class="iconsSprite tuner"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "XYZ Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite xyzMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "Gemini Monster") {
            card.type = "Gemini"
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite geminiMonster gemini"></span>  ${card.type.toUpperCase()} EFFECT MONSTER </span>
          `
        }

        if (type == "Pendulum Effect Monster" || type == "Pendulum Flip Effect Monster" || type == "Pendulum Tuner Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "XYZ Pendulum Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumXyzMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "Synchro Pendulum Effect Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumSynchroMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "Pendulum Effect Fusion Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite pendulumFusionMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "Link Monster") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite linkMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (type == "Token") {
            document.getElementById(modalId).innerHTML += `
          <span> <span class="iconsSprite tokenMonster"></span>  ${card.type.toUpperCase()} </span>
          `
        }

        if (card.atk == undefined || card.atk == null) {
            card.atk = " - "
        }
        if (card.def == undefined || card.def == null) {
            card.def = " - "
        }

        document.getElementById(modalId).innerHTML += ` 
        <br>
        <span> <span class="iconsSprite cardAtk"></span>  ${card.atk} </span>
        <span> <span class="iconsSprite cardDef"></span>  ${card.def} </span>
        `

    }
}

function whichAttribute(modalId, card) {
    let cardAttribute = card.attribute.toLowerCase()
    // console.log(cardRace)


    if (cardAttribute == "light") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite light"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

    if (cardAttribute == "dark") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite dark"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

    if (cardAttribute == "water") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite water"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

    if (cardAttribute == "fire") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fire"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

    if (cardAttribute == "earth") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite earth"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

    if (cardAttribute == "wind") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite wind"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

    if (cardAttribute == "divine") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite divine"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

    if (cardAttribute == "spell") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite spell"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

    if (cardAttribute == "trap") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite trap"></span>  ${card.attribute.toUpperCase()} </span>
    `
    }

}

function whichRace(modalId, race, card) {
    let cardRace = (card.race.replace(/\s/g, '')).toLowerCase().replace('-', '');
    // console.log(cardRace)


    if (cardRace == "aqua") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite aqua"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "beast") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite beast"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "beastwarrior") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite beastWarrior"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "creatorgod") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite creatorGod"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "cyberse") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite cyberse"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "dinosaur") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite dinosaur"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "divinebeast") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite divineBeast"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "dragon") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite dragon"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "fairy") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fairy"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "fiend") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fiend"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "fish") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fish"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "insect") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite insect"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "machine") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite machine"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "plant") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite plant"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "psychic") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite psychic"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "pyro") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite pyro"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "reptile") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite reptile"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "rock") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite rock"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "seaserpent") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite seaSerpent"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "spellcaster") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite spellcaster"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "thunder") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite thunder"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "warrior") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite warrior"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "wingedbeast") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite wingedBeast"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "wyrm") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite wyrm"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "zombie") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite zombie"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "normal" && card.type == "Spell Card") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite normalSpell"></span>  ${card.race.toUpperCase()} </span>
    `
    }
    if (cardRace == "normal" && card.type == "Trap Card") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite normalTrap"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "continuous" && card.type == "Spell Card") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite continuousSpell"></span>  ${card.race.toUpperCase()} </span>
    `
    }


    if (cardRace == "continuous" && card.type == "Trap Card") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite continuousTrap"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "quickplay") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite quickPlaySpell"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "ritual") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite ritualSpell"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "counter") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite counterTrap"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "equip") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite equipTrap"></span>  ${card.race.toUpperCase()} </span>
    `
    }

    if (cardRace == "field") {
        document.getElementById(modalId).innerHTML += `
    <span> <span class="iconsSprite fieldSpell"></span>  ${card.race.toUpperCase()} </span>
    `
    }



}



function hasAlternativeArt(modalId, card) {
    if (card.card_images.length > 1) {
        document.getElementById(`cardHeaderDiv_${modalId}`).innerHTML += ` <button type="button" onclick="changeCardArtwork(${modalId})" class="btn btn-dark">Change Art</button> `
        // console.log("card " + card.name + " has alt art")
    }

}

function changeCardArtwork(cardId) {
    // console.log("changing artowrk for " + cardId)
    // Search for card in CurrentCards and check how many artworks it has 
    let cardsWithAltArtworks = currentCards.filter(card => card.card_images.length > 1)
    // Loop artworks here 
    let filterCurrentArtwork = cardsWithAltArtworks.filter(card => card.id == cardId)
    // console.log(filterCurrentArtwork[0])
    if (filterCurrentArtwork[0].card_images[filterCurrentArtwork[0].card_images.length - 1].image_url == document.getElementById(`img_${cardId}`).src) {
        document.getElementById(`img_${cardId}`).src = filterCurrentArtwork[0].card_images[0].image_url
    } else {
        let cardCurrentId = document.getElementById(`img_${cardId}`).src.replace(".jpg", "")
            .replace("https://images.ygoprodeck.com/images/cards/", "")

        document.getElementById(`img_${cardId}`).src = `https://images.ygoprodeck.com/images/cards/${Number(cardCurrentId) +1}.jpg`
    }

}


function printCardSets(modalId, card) {


    // console.log(card.card_sets.length)

    document.getElementById(modalId).innerHTML = `
          <table class="table table-bordered" >
          <thead>
            <tr>
              <th scope="col" class="tableHead">Set</th>
              <th scope="col"class="tableHead">Rarity</th>
              <th scope="col"class="tableHead">Set Code</th>
              <th scope="col"class="tableHead" data-toggle="tooltip" data-placement="top" title="Shown price is the average price for that card of that specific set, the price is expresed in US dolars">Price</th>
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
             <th scope="row"  class="cardSet tableBody" id="set_${card.id}" onclick='load(searchBySet,"${card.card_sets[i].set_name}")'  data-bs-toggle="modal" data-bs-target="#card_${card.id}" style="cursor: pointer">${card.card_sets[i].set_name.toUpperCase()}</th>
             <td class="tableBody">${card.card_sets[i].set_rarity_code} ${card.card_sets[i].set_rarity}</td>
             <td class="tableBody greenText" style="cursor: pointer" onclick="changeCardPicture(${card.id}, '${card.card_sets[i].set_code}')"> ${card.card_sets[i].set_code}</td>
             <td class="tableBody">$ ${card.card_sets[i].set_price}</td>
           </tr>
    
    `
    }

}


function createSet(sets) {

    let setName = sets.set_name
    let setCode = sets.set_code
    let setDate = sets.tcg_date
    let setQuantity = sets.num_of_cards

    let setImage = setName.replace(/ /g, "_")
        .replace(/:/g, "_")
        .replace(/-/g, "_")
        .replace(/!/g, "_");


    cardsSection.innerHTML += `
        <div class="sets" id='${setCode}' >
          <div class="setGrid" >

            <div class="setImage"> 
            <div class='cardInfo'>
            <span><a  style="cursor: pointer" id="${setCode}" class='getBySet setName'  onclick="load(searchBySet,'${setName}')" > ${setName} </a><br><span class="setInfo">${setQuantity} // ${setCode} //  ${setDate}</span></span> 
            </div>
              <button type="button" class="btn" data-toggle="modal" data-target="#ModalID${setCode}">
                <img src="https://static-7.studiobebop.net/ygo_data/set_images/${setImage}.jpg" loading='lazy' onerror="this.src='error.gif';this.onerror='';" class="card-img-bottom setImages" id='${setName}'  alt="set Image" srcset=""> 
            
              </button>
            </div>

          
          

            <div class="modal fade modalCardImage" id="ModalID${setCode}" class="close" data-dismiss="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content modalImage">
                  
                  <img src="https://static-7.studiobebop.net/ygo_data/set_images/${setImage}.jpg" loading='lazy' onerror="this.src='error.gif';this.onerror='';" class="card-img-bottom setImages" id='${setName}' alt="${setName}" class="close" data-dismiss="modal">

                </div>
              </div>
            </div>

          </div>
        </div>
	
  `
}

function changeCardPicture(cardId, cardSetCode) {
    document.getElementById(`img_${cardId}`).src = `https://static-7.studiobebop.net/ygo_data/card_variants/${cardSetCode}.jpg`
}

function correctCardImage(cardId) {
    const img = new Image();
    img.onload = function() {
        // alert(this.width + 'x' + this.height);
        if (this.height < this.width) {
            console.log("changing image")
            document.getElementById(`img_${cardId}`).src = '../media/noimage.webp'
            document.getElementById(`img2_${cardId}`).src = '../media/noimage.webp'
        }
    }
    img.src = document.getElementById(`img_${cardId}`).src




}