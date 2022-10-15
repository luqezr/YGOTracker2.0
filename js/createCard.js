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
            <p class="cardSubTitle">
              <span class="cardArchetype" onclick="searchByArchetype('${card.archetype}')" data-bs-toggle="modal" data-bs-target="#card_${card.id}">Archetype: <span>${card.archetype}</span></span>
              <i class="bi bi-diamond-fill"></i>
              <span> ID: ${card.id} </span>
              <i class="bi bi-diamond-fill"></i>
              <span> Race: ${card.race} </span>
              <i class="bi bi-diamond-fill"></i>
              <span> Type: ${card.type} </span>
              <i class="bi bi-diamond-fill"></i>
              <span> Release Date: ${card.misc_info[0].ocg_date} </span>
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


}

