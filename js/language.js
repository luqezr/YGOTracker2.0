// PAGE

var text_CardResults1 = "Card results : <span class='greenText'>"
var text_CardResults2 = "</span>"
var text_NewestCards1 = "Newest Cards "
var text_NewestCards2 = ""
var text_Archetype1 = " cards from the Archetype "
var text_Archetype2 = " "
var text_SetResults1 = " cards from the set "
var text_SetResults2 = " "
var text_FormatResults1 = " cards from the format "
var text_FormatResults2 = " "
var text_allSets1 = "There are "
var text_allSets2 = " sets"
var text_allCards1 = "All cards from newer to older"
var text_allCards2 = ""
var text_banlist1 = "Banlist for <span class'purpleText'>"
var text_banlist2 = "</span> format"
var text_banlistTCG = "TCG"
var text_banlistOCG = "OCG"
var text_banlistGOAT = "GOAT"
var text_banlistEDISON = "EDISON"






var text_allFilters = `
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

</h2>
`

var text_imageFromSet =
    `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      ...
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>
</div>

`



// CARDS

// var currentLanguage;
var cardDescriptionLanguages = {
    attributes: {
        dark: {
            de: "FINSTERNIS",
            en: "DARK",
            es: "OSCURIDAD",
            fr: "TÉNÈBRES",
            it: "OSCURITÀ",
            ja: "闇属性",
            ko: "어둠",
            pt: "TREVAS",
        },
        divine: {
            de: "GÖTTLICH",
            en: "DIVINE",
            es: "DIVINIDAD",
            fr: "DIVIN",
            it: "DIVINO",
            ja: "神属性",
            ko: "신",
            pt: "DIVINO",
        },
        earth: {
            de: "ERDE",
            en: "EARTH",
            es: "TIERRA",
            fr: "TERRE",
            it: "TERRA",
            ja: "地属性",
            ko: "땅",
            pt: "TERRA",
        },
        fire: {
            de: "FEUER",
            en: "FIRE",
            es: "FUEGO",
            fr: "FEU",
            it: "FUOCO",
            ja: "炎属性",
            ko: "화염",
            pt: "FOGO",
        },
        light: {
            de: "LICHT",
            en: "LIGHT",
            es: "LUZ",
            fr: "LUMIÈRE",
            it: "LUCE",
            ja: "光属性",
            ko: "빛",
            pt: "LUZ",
        },
        spell: {
            de: "ZAUBER",
            en: "SPELL",
            es: "MÁGICA",
            fr: "MAGIE",
            it: "MAGIA",
            ja: "魔法",
            ko: "마법",
            pt: "MAGIA",
        },
        trap: {
            de: "FALLE",
            en: "TRAP",
            es: "TRAMPA",
            fr: "PIÈGE",
            it: "TRAPPOLA",
            ja: "罠",
            ko: "함정",
            pt: "ARMADILHA",
        },
        water: {
            de: "WASSER",
            en: "WATER",
            es: "AGUA",
            fr: "EAU",
            it: "ACQUA",
            ja: "水属性",
            ko: "물",
            pt: "ÁGUA",
        },
        wind: {
            de: "WIND",
            en: "WIND",
            es: "VIENTO",
            fr: "VENT",
            it: "VENTO",
            ja: "風属性",
            ko: "바람",
            pt: "VENTO",
        },
    },
    properties: {
        continuous: {
            de: "Permanent",
            en: "Continuous",
            es: "Continua",
            fr: "Continu",
            it: "Continua",
            ja: "永続",
            ko: "지속",
            pt: "Contínua",
        },
        counter: {
            de: "Konter",
            en: "Counter",
            es: "Contraefecto",
            fr: "Contre",
            it: "Contro",
            ja: "カウンター",
            ko: "카운터",
            pt: "Marcador",
        },
        equip: {
            de: "Ausrüstung",
            en: "Equip",
            es: "Equipo",
            fr: "Équipement",
            it: "Equipaggiamento",
            ja: "装備",
            ko: "장착",
            pt: "Equipamento",
        },
        field: {
            de: "Spielfeld",
            en: "Field",
            es: "Campo",
            fr: "Terrain",
            it: "Terreno",
            ja: "フィールド",
            ko: "필드",
            pt: "Campo",
        },
        quickplay: {
            de: "Schnell",
            en: "Quick-Play",
            es: "Juego Rápido",
            fr: "Jeu-Rapide",
            it: "Rapida",
            ja: "速攻",
            ko: "속공",
            pt: "Rápida",
        },
        ritual: {
            de: "Ritual",
            en: "Ritual",
            es: "Ritual",
            fr: "Rituel",
            it: "Rituale",
            ja: "儀式",
            ko: "의식",
            pt: "Ritual",
        },
    },
    types: {
        creator_god: {
            de: "Ungeheuer",
            en: "Creator God",
            es: "Dios Creador",
            fr: "Dieu Créateur",
            it: "Dio Creatore",
            ja: "創造神族",
            ko: "창조주 하나님",
            pt: "Deus Criador",
        },
        special_summon_monster: {
            en: "Special Summon Monster",
            ja: "特殊召喚",
            ko: "특수 소환",
        },
        beast: {
            de: "Ungeheuer",
            en: "Beast",
            es: "Bestia",
            fr: "Bête",
            it: "Bestia",
            ja: "獣族",
            ko: "야수족",
            pt: "Besta",
        },
        effect: {
            de: "Effekt",
            en: "Effect",
            es: "Efecto",
            fr: "Effet",
            it: "Effetto",
            ja: "効果",
            ko: "효과",
            pt: "Efeito",
        },
        fish: {
            de: "Fisch",
            en: "Fish",
            es: "Pez",
            fr: "Poisson",
            it: "Pesce",
            ja: "魚族",
            ko: "어류족",
            pt: "Peixe",
        },
        normal: {
            de: "Normale",
            en: "Normal",
            es: "Normal",
            fr: "Normaux",
            it: "Normale",
            ja: "通常",
            ko: "일반",
            pt: "Normal",
        },
        flip: {
            de: "Flipp",
            en: "Flip",
            es: "Volteo",
            fr: "Flip",
            it: "Scoperta",
            ja: "リバース",
            ko: "리버스",
            pt: "Virar",
        },
        spellcaster: {
            de: "Hexer",
            en: "Spellcaster",
            es: "Lanzador de Conjuros",
            fr: "Magicien",
            it: "Incantatore",
            ja: "魔法使い族",
            ko: "마법사족",
            pt: "Mago",
        },
        machine: {
            de: "Maschine",
            en: "Machine",
            es: "Máquina",
            fr: "Machine",
            it: "Macchina",
            ja: "機械族",
            ko: "기계족",
            pt: "Machine",
        },
        union: {
            de: "Union",
            en: "Union",
            es: "Unión",
            fr: "Union",
            it: "Unione",
            ja: "ユニオン",
            ko: "유니온",
            pt: "União",
        },
        fusion: {
            de: "Fusion",
            en: "Fusion",
            es: "Fusión",
            fr: "Fusion",
            it: "Fusione",
            ja: "融合",
            ko: "융합",
            pt: "Fusão",
        },
        warrior: {
            de: "Krieger",
            en: "Warrior",
            es: "Guerrero",
            fr: "Guerrier",
            it: "Guerriero",
            ja: "戦士族",
            ko: "전사족",
            pt: "Guerreiro",
        },
        beast_warrior: {
            de: "Ungeheuer-Krieger",
            en: "Beast-Warrior",
            es: "Guerrero-Bestia",
            fr: "Bête-Guerrier",
            it: "Guerriero-Bestia",
            ja: "獣戦士族",
            ko: "야수전사족",
            pt: "Besta-Guerreira",
        },
        fiend: {
            de: "Unterweltler",
            en: "Fiend",
            es: "Demonio",
            fr: "Démon",
            it: "Demone",
            ja: "悪魔族",
            ko: "악마족",
            pt: "Demônio",
        },
        fairy: {
            de: "Fee",
            en: "Fairy",
            es: "Hada",
            fr: "Elfe",
            it: "Fata",
            ja: "天使族",
            ko: "천사족",
            pt: "Fada",
        },
        pendulum: {
            de: "Pendel",
            en: "Pendulum",
            es: "Péndulo",
            fr: "Pendule",
            it: "Pendulum",
            ja: "ペンデュラム",
            ko: "펜듈럼",
            pt: "Pêndulo",
        },
        sea_serpent: {
            de: "Seeschlange",
            en: "Sea Serpent",
            es: "Serpiente Marina",
            fr: "Serpent de Mer",
            it: "Serpente Marino",
            ja: "海竜族",
            ko: "해룡족",
            pt: "Serpente Marinha",
        },
        xyz: {
            de: "Xyz",
            en: "Xyz",
            es: "Xyz",
            fr: "Xyz",
            it: "Xyz",
            ja: "エクシーズ",
            ko: "엑시즈",
            pt: "Xyz",
        },
        synchro: {
            de: "Synchro",
            en: "Synchro",
            es: "Sincronía",
            fr: "Synchro",
            it: "Synchro",
            ja: "シンクロ",
            ko: "싱크로",
            pt: "Sincro",
        },
        tuner: {
            de: "Empfänger",
            en: "Tuner",
            es: "Cantante",
            fr: "Syntoniseur",
            it: "Tuner",
            ja: "チューナー",
            ko: "튜너",
            pt: "Regulador",
        },
        dragon: {
            de: "Drache",
            en: "Dragon",
            es: "Dragón",
            fr: "Dragon",
            it: "Drago",
            ja: "ドラゴン族",
            ko: "드래곤족",
            pt: "Dragão",
        },
        wyrm: {
            de: "Wyrm",
            en: "Wyrm",
            es: "Wyrm",
            fr: "Wyrm",
            it: "Wyrm",
            ja: "幻竜族",
            ko: "환룡족",
            pt: "Wyrm",
        },
        link: {
            de: "Link",
            en: "Link",
            es: "Enlace",
            fr: "Lien",
            it: "Link",
            ja: "リンク",
            ko: "링크",
            pt: "Link",
        },
        rock: {
            de: "Fels",
            en: "Rock",
            es: "Roca",
            fr: "Rocher",
            it: "Roccia",
            ja: "岩石族",
            ko: "암석족",
            pt: "Rocha",
        },
        plant: {
            de: "Pflanze",
            en: "Plant",
            es: "Planta",
            fr: "Plante",
            it: "Pianta",
            ja: "植物族",
            ko: "식물족",
            pt: "Planta",
        },
        spirit: {
            de: "Spirit",
            en: "Spirit",
            es: "Spirit",
            fr: "Spirit",
            it: "Spirit",
            ja: "スピリット",
            ko: "스피릿",
            pt: "Espírito",
        },
        ritual: {
            de: "Ritual",
            en: "Ritual",
            es: "Ritual",
            fr: "Rituel",
            it: "Rituale",
            ja: "儀式",
            ko: "의식",
            pt: "Ritual",
        },
        gemini: {
            de: "Zwilling",
            en: "Gemini",
            es: "Géminis",
            fr: "Gémeau",
            it: "Gemello",
            ja: "デュアル",
            ko: "듀얼",
            pt: "Gêmeos",
        },
        reptile: {
            de: "Reptil",
            en: "Reptile",
            es: "Reptil",
            fr: "Reptile",
            it: "Rettile",
            ja: "爬虫類族",
            ko: "파충류족",
            pt: "Réptil",
        },
        cyberse: {
            de: "Cyberse",
            en: "Cyberse",
            es: "Ciberso",
            fr: "Cyberse",
            it: "Cyberse",
            ja: "サイバース族",
            ko: "사이버스족",
            pt: "Ciberso",
        },
        aqua: {
            de: "Aqua",
            en: "Aqua",
            es: "Aqua",
            fr: "Aqua",
            it: "Acqua",
            ja: "水族",
            ko: "물족",
            pt: "Aqua",
        },
        zombie: {
            de: "Zombie",
            en: "Zombie",
            es: "Zombi",
            fr: "Zombie",
            it: "Zombie",
            ja: "アンデット族",
            ko: "언데드족",
            pt: "Zumbi",
        },
        psychic: {
            de: "Psi",
            en: "Psychic",
            es: "Psíquico",
            fr: "Psychique",
            it: "Psichico",
            ja: "サイキック族",
            ko: "사이킥족",
            pt: "Psíquico",
        },
        insect: {
            de: "Insekt",
            en: "Insect",
            es: "Insecto",
            fr: "Insecte",
            it: "Insetto",
            ja: "昆虫族",
            ko: "곤충족",
            pt: "Inseto",
        },
        winged_beast: {
            de: "Geflügeltes Ungeheuer",
            en: "Winged Beast",
            es: "Bestia Alada",
            fr: "Bête Ailée",
            it: "Bestia Alata",
            ja: "鳥獣族",
            ko: "비행야수족",
            pt: "Besta Alada",
        },
        dinosaur: {
            de: "Dinosaurier",
            en: "Dinosaur",
            es: "Dinosaurio",
            fr: "Dinosaure",
            it: "Dinosauro",
            ja: "恐竜族",
            ko: "공룡족",
            pt: "Dinossauro",
        },
        pyro: {
            de: "Pyro",
            en: "Pyro",
            es: "Piro",
            fr: "Pyro",
            it: "Pyro",
            ja: "炎族",
            ko: "화염족",
            pt: "Piro",
        },
        thunder: {
            de: "Donner",
            en: "Thunder",
            es: "Trueno",
            fr: "Tonnerre",
            it: "Tuono",
            ja: "雷族",
            ko: "번개족",
            pt: "Trovão",
        },
        divine_beast: {
            de: "Göttliches Ungeheuer",
            en: "Divine-Beast",
            es: "Bestia Divina",
            fr: "Bête Divine",
            it: "Divinità-Bestia",
            ja: "幻神獣族",
            ko: "환신야수족",
            pt: "Besta Divina",
        },
        toon: {
            de: "Toon",
            en: "Toon",
            es: "Toon",
            fr: "Toon",
            it: "Toon",
            ja: "トゥーン",
            ko: "툰",
            pt: "Toon",
        },
    },
};

/*
function loadLanguage(lang) {
  currentLanguage = {
    attributes: {
      dark: allLanguages.attributes.dark.lang,
      divine: allLanguages.attributes.divine.lang,
      earth: allLanguages.attributes.earth.lang,
      fire: allLanguages.attributes.fire.lang,
      light: allLanguages.attributes.light.lang,
      spell: allLanguages.attributes.spell.lang,
      trap: allLanguages.attributes.trap.lang,
      water: allLanguages.attributes.water.lang,
      wind: allLanguages.attributes.wind.lang,
    
    },
    properties: {
      continuous: allLanguages.attributes.continuous.lang,
      counter: allLanguages.attributes.counter.lang,
      equip: allLanguages.attributes.equip.lang,
      field: allLanguages.attributes.field.lang,
      quickplay: allLanguages.attributes.quickplay.lang,
      ritual: allLanguages.attributes.ritual.lang,
    },
    types: {
      creator_god: allLanguages.attributes.creator_god.lang,
      beast: allLanguages.attributes.beast.lang,
      effect: allLanguages.attributes.effect.lang,
      fish: allLanguages.attributes.fish.lang,
      normal: allLanguages.attributes.normal.lang,
      flip: allLanguages.attributes.flip.lang,
      spellcaster: allLanguages.attributes.spellcaster.lang,
      machine: allLanguages.attributes.machine.lang,
      union: allLanguages.attributes.union.lang,
      fusion: allLanguages.attributes.fusion.lang,
      warrior: allLanguages.attributes.warrior.lang,
      beast_warrior: allLanguages.attributes.beast_warrior.lang,
      fiend: allLanguages.attributes.fiend.lang,
      fairy: allLanguages.attributes.fairy.lang,
      pendulum: allLanguages.attributes.pendulum.lang,
      sea_serpent: allLanguages.attributes.sea_serpent.lang,
      xyz: allLanguages.attributes.xyz.lang,
      synchro: allLanguages.attributes.synchro.lang,
      tuner: allLanguages.attributes.tuner.lang,
      dragon: allLanguages.attributes.dragon.lang,
      wyrm: allLanguages.attributes.wyrm.lang,
      link: allLanguages.attributes.link.lang,
      rock: allLanguages.attributes.rock.lang,
      plant: allLanguages.attributes.plant.lang,
      spirit: allLanguages.attributes.spirit.lang,
      ritual: allLanguages.attributes.ritual.lang,
      gemini: allLanguages.attributes.gemini.lang,
      reptile: allLanguages.attributes.reptile.lang,
      cyberse: allLanguages.attributes.cyberse.lang,
      aqua: allLanguages.attributes.aqua.lang,
      zombie: allLanguages.attributes.zombie.lang,
      psychic: allLanguages.attributes.psychic.lang,
      insect: allLanguages.attributes.insect.lang,
      winged_beast: allLanguages.attributes.winged_beast.lang,
      dinosaur: allLanguages.attributes.dinosaur.lang,
      pyro: allLanguages.attributes.pyro.lang,
      thunder: allLanguages.attributes.thunder.lang,
      divine_beast: allLanguages.attributes.divine_beast.lang,
      toon: allLanguages.attributes.toon.lang,
    },
    
  };
}
*/