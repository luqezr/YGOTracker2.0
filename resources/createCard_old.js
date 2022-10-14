whatType = createCard;

function assignValuesToCard(
  card,
  createCard_releaseText_1,
  createCard_releaseText_2_1,
  createCard_releaseText_2_2,
  createCard_releaseText_3_1,
  createCard_releaseText_3_2,
  createCard_releaseText_3_3,
  createCard_banlist_info_unlimited,
  createCard_banlist_info_limited,
  createCard_banlist_info_semi_limited,
  createCard_banlist_info_banned,
  createCard_attribute_spell,
  createCard_attribute_trap
) {
  //console.log(card);
  id = card.id;
  name = card.name;
  //name = name.replace(/\b[a-z]/g,c=>c.toUpperCase())
  name = name.toUpperCase();
  fname = card.fname;
  desc = card.desc;
  type = card.type;
  type_language = card.type;
  type_image = card.type;
  atk = card.atk;
  def = card.def;
  level = card.level;
  level_image = card.level;
  race = card.race;
  race_language = card.race;
  race_image = card.race;
  attribute = card.attribute;
  attribute_language = card.attribute;
  attribute_image = card.attribute;
  link = card.link;
  linkmarker = card.linkmarker;
  linkvale = card.linkval;
  scale = card.scale;
  set = card.set;
  archetype = card.archetype;

  versionCardImageLink=[]

  if (archetype == undefined) {
    archetype = " - ";
  }
  // banlist_info = card.banlist_info

  misc_info = card.misc_info;
  // console.log(misc_info)
  if (misc_info === undefined) {
    releaseText = createCard_releaseText_1;
    konami_id = "-";
  } else {
    konami_id = misc_info[0].konami_id;

    if (misc_info[0].tcg_date == undefined) {
      releaseText = `${createCard_releaseText_2_1}${misc_info[0].ocg_date}${createCard_releaseText_2_2}`;
      if (konami_id === undefined) {
        konami_id = "-";
      }
    }
    if (misc_info[0].tcg_date !== undefined) {
      releaseText = `${createCard_releaseText_3_1}${misc_info[0].ocg_date}${createCard_releaseText_3_2}${misc_info[0].tcg_date}${createCard_releaseText_3_3}`;
    }
    if (
      misc_info[0].tcg_date == undefined &&
      misc_info[0].ocg_date == undefined
    ) {
      releaseText = createCard_releaseText_1;
    }
  }

  // Card Image Big
  if (card.card_images === undefined) {
    cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`;
  } else {
    cardImage = card.card_images[0].image_url;
  }
  if (images === false) {
    cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`;
  }

  // Card Image Small https://storage.googleapis.com/ygoprodeck.com/pics_small/
  if (card.card_images === undefined) {
    cardImage_small = `https://storage.googleapis.com/ygoprodeck.com/pics_small/${id}.jpg`;
  } else {
    cardImage_small = card.card_images[0].image_url_small;
  }
  if (images === false) {
    cardImage_small = `https://storage.googleapis.com/ygoprodeck.com/pics_small/${id}.jpg`;
  }


  card_prices = card.card_prices;
  card_sets = [card.card_sets];
  if (def === undefined || def == null) {
    def = " - ";
  }
  if (atk === undefined || atk == null) {
    atk = " - ";
  }
  if (attribute === undefined) {
    attribute = " - ";
  }
  if (level === undefined) {
    level = "LINK -" + card.linkval;
  }
  if (card_prices !== undefined) {
    //cardPrice = ('Amazon price : '+ card_prices[0].amazon_price + '<br>CardMarket price : ' +  card_prices[0].cardmarket_price+ '<br>Ebay price : ' +  card_prices[0].ebay_price + '<br>TCGPlayer price : ' +   card_prices[0].tcgplayer_price +'<br>')
  } else {
    cardPrice = "";
  }

  banlist_info = card.banlist_info;
  // console.log(banlist_info)

  if (banlist_info == undefined) {
    banlist_info = createCard_banlist_info_unlimited;
    banlist_info_image = "Unlimited";
  }

  if (banlist == "tcg") {
    if (banlist_info.ban_tcg) {
      // console.log("existe ban en tcg")
    } else {
      banlist_info = createCard_banlist_info_unlimited;
      banlist_info_image = "Unlimited";
      // console.log("no existe ban en tcg")
    }

    // banlist_info = banlist_info.ban_tcg;
    if (banlist_info == undefined) {
      banlist_info = createCard_banlist_info_unlimited;
      banlist_info_image = "Unlimited";
      // console.log(banlist_info_image)
    } else if (banlist_info.ban_tcg == "Limited") {
      banlist_info = createCard_banlist_info_limited;
      banlist_info_image = "Limited";
      // console.log(banlist_info_image)
    } else if (banlist_info.ban_tcg == "Semi-Limited") {
      banlist_info = createCard_banlist_info_semi_limited;
      banlist_info_image = "Semi-Limited";
      // console.log(banlist_info_image)
    } else if (banlist_info.ban_tcg == "Banned") {
      banlist_info = createCard_banlist_info_banned;
      banlist_info_image = "Banned";
      // console.log(banlist_info_image)
    }
  }

  if (banlist == "ocg") {
    banlist_info = banlist_info.ban_ocg;
  }

  if (banlist == "goat") {
    banlist_info = banlist_info.ban_goat;
  }

  if (type == "Spell Card") {
    attribute = createCard_attribute_spell;
    level = "-";
  }
  if (type == "Trap Card") {
    attribute = createCard_attribute_trap;
    level = "-";
  }
}

function createCard(card) {
  assignValuesToCard(
    card,
    createCard_releaseText_1,
    createCard_releaseText_2_1,
    createCard_releaseText_2_2,
    createCard_releaseText_3_1,
    createCard_releaseText_3_2,
    createCard_releaseText_3_3,
    createCard_banlist_info_unlimited,
    createCard_banlist_info_limited,
    createCard_banlist_info_semi_limited,
    createCard_banlist_info_banned,
    createCard_attribute_spell,
    createCard_attribute_trap
  );

  if (type == "Trap Card" || type == "Spell Card") {
    subContent2.innerHTML += `
		<div>
			<div class="card cards" class='showCardInfo' style="width: 100%;">
				<div class="cardGrid" >
					<div class"cardGridIMG"> 

						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
						<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_imageModal' alt="${name}" >
						</button>

					
					</div>
						<div class='cardInfo'  id='${name}'>
							<h5>${name}</h5>
							<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText"> ${type} </span> / <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText">${race}</span> /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a style="cursor: pointer" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span>  / <span class="cardInfoText"> Card ID :<span onclick='getCardID(this.id)'> <a  style="cursor: pointer" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>

						
								
							<p class="cardDescription">${desc}</p>
						
						<p id="${id}_setsTitles"> ${releaseText}</p>
						<table  class="priceTable"  id="${id}_setTable" >
								<tr>
								<th>Set</th>
								<th>Rareza</th>
								<th>Código</th>
								<th>Precio</th>
								</tr>
							</table>
							<br>
							<div id='prices'>
			
							</div>


							<div id="${id}_moreInfo"> </div>
					

						</div>
						
					
					</div>
		  
				</div>
			</div>
			
			

			<div class="miniCard" class="card" class="col-sm" >
	

	<div class="modal fade modalCardImage" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content modalImage">
			<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_image' alt="${name}" data-dismiss="modal" >

			
				</div>
			</div>


		</div>

	`;
  } else {
    let levelOrRankOrLink = "level";

    if (type == "XYZ Monster" || type == "XYZ Pendulum Effect Monster") {
      levelOrRankOrLink = "rank";
    }

    if (type == "Link Monster") {
      levelOrRankOrLink = "link";
    }

    subContent2.innerHTML += `
	<div>
	<div class="card cards" class='showCardInfo' style="width: 100%;">
	<div class="cardGrid" >
	
	<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
		<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_imageModal' alt="${name}" >
		</button>

		<div class='cardInfo'  id='${name}'>
		
			<h5>${name}</h5>
			<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${type} </span>/ <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${race}</span> / <img src="/media/icons/cardIcons/attribute/${attribute_image}.png" style="width : 20px" class="card-img-bottom" alt="Attribute Icon"><span class="cardInfoText"> ${attribute}</span> /  <img src="/media/icons/cardIcons/${levelOrRankOrLink}.png" style="width : 20px" class="card-img-bottom" alt="Level Icon">  ${level} /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a style="cursor: pointer" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span>  /  <span class="cardInfoText"><b> ATK </b>: </span><img src="/media/icons/cardIcons/attack.png" style="width : 18px" class="card-img-bottom" alt="Atk Icon"> ${atk}  /  <span class="cardInfoText"><b> DEF </b>: </span><img src="/media/icons/cardIcons/defense.png" style="width : 18px" class="card-img-bottom" alt="Def Icon"> ${def} /<span class="cardInfoText">  Card ID :<span onclick='getCardID(this.id)'> <a style="cursor: pointer" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>
		
			<p class="cardDescription">${desc}</p>
			<p id="${id}_setsTitles"> ${releaseText}</p>
			<table class="priceTable" id="${id}_setTable" >
			<tr>
			<th>Set</th>
			<th>Rareza</th>
			<th>Código</th>
			<th>Precio</th>
			</tr>
			</table>
			<br>
			<div id='prices'>
			</div>
			
			<div id="${id}_moreInfo"> </div>

		</div>
	
	</div>
	  
	</div>
</div>
	
<div class="miniCard" class="card" class="col-sm" >
		

		<div class="modal fade modalCardImage" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content modalImage">
					
					<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_image' alt="${name}" data-dismiss="modal" >
				</div>
			</div>
		</div>
	</div>



</div>

	`;
  }

  if (card_sets[0] !== undefined) {
    card_sets.forEach(function (setName, i) {
      for (var b = 0; b < card_sets[0].length; b++) {
        set_code = setName[b].set_code;
        set_name = setName[b].set_name;
        set_price = setName[b].set_price;
        set_rarity = setName[b].set_rarity;
		

        //console.log(set_code)
        document.getElementById(id + "_setTable").innerHTML += `
		   <div onclick='addToCollection(this.id)' style='display:inline'>
			
		 


			<tr>
			<td><span onclick='cardSet(this.id)'>  <a  style="cursor: pointer" id="${setName[b].set_name}" class='getBySet'  class="close" data-dismiss="modal" aria-label="Close"> ${setName[b].set_name} </a></span>  </td>
			<td class="setRarity">  ${set_rarity}  </td>
			<td class="setCode" ><span onclick='getCardSetCode(this.id)'>  <a  style="cursor: pointer" id="${setName[b].set_code}" class='getBySet'  class="close" data-dismiss="modal" aria-label="Close"> ${setName[b].set_code} </a></span></td> 
			<td class="setPrice"> $${setName[b].set_price}  </td>
				

		   </div>
		   
		  `;
      }
	  document.getElementById(id + "_moreInfo").innerHTML += ` 
	  					<div class='moreCardInfo'>
							<a href='https://yugipedia.com/wiki/${id}' target="_blank"> Yugipedia </a> / 
							<a href='https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${konami_id}' target="_blank"> Konami Database </a> / 
							<a href='https://db.ygorganization.com/card#${konami_id}' target="_blank"> Card Rulings </a>
							<br>
							<p>
							Card market: €${card_prices[0].cardmarket_price}* / 
							TCG Player: $${card_prices[0].tcgplayer_price}* / 
							Ebay: $${card_prices[0].ebay_price}* / 
							Amazon: $${card_prices[0].amazon_price}* / 
							Coolstuff Inc: $${card_prices[0].coolstuffinc_price}*
							<br>
							*${lowerPriceText}
							</p>
						
						</div>`
    });
  } else {
    document.getElementById(id + "_setTable").innerHTML = " ";
    document.getElementById(id + "_setTable").innerHTML += ` `;
  }
}

function modifyPriceList(card, set) {
  currentSet = set;
  avg = card.average;
  high = card.high;
  low = card.low;
  oneDay = card.shift.toFixed(3);
  threeDay = card.shift_3.toFixed(3);
  sevenDay = card.shift_7.toFixed(3);
  twentyOneDay = card.shift_21.toFixed(3);
  thirtyDay = card.shift_30.toFixed(3);
  ninetyDay = card.shift_90.toFixed(3);
  ohaeDay = card.shift_180.toFixed(3);
  tsDay = card.shift_365.toFixed(3);
  updated = card.updated_at;

  var listTBody = document.getElementsByClassName("cardInfo");

  // console.log(listTBody)

  listTBody[0].innerHTML += `

	<p>Price Shift for <span onclick='cardSet(this.id)'>  <a  style="cursor: pointer" id="${currentSet}" class='getBySet'  class="close" data-dismiss="modal" aria-label="Close">${currentSet}</a>, updated at ${updated}</p>
	<thead >		
	<table >
								<tr>
								<th>Average</th>
								<th>High</th>
								<th>Low</th>
								</tr>
												
  </thead>
  <tbody>
								<tr>
								<td>$${avg}</td>
								<td>$${high}</td>
								<td>$${low}</td>
								</tr>
			
			</table>
			<br>
			<table>
								<tr>
								<th>1 Day</th>
								<th>3 Days</th>
								<th>7 Days</th>
								<th>21 Days</th>
								</tr>
								<tr>
								<td>$${oneDay}</td>
								<td>$${threeDay}</td>
								<td>$${sevenDay}</td>
								<td>$${twentyOneDay}</td>
								</tr>
								</table>
								<br>
								<table>
								<tr>
								<th>30 Days</th>
								<th>90 Days</th>
								<th>180 Days</th>
								<th>365 Days</th>
								</tr>
								<tr>
								<td>$${thirtyDay}</td>
								<td>$${ninetyDay}</td>
								<td>$${ohaeDay}</td>
								<td>$${tsDay}</td>
								</tr>

	  </table>
	`;
}
