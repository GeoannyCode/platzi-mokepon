
//carga de componentes
window.addEventListener('load', startGame)

//lista de mascota
let animalEmojis = [
    { name: "Hipodoge", emoji: "🐘" },
    { name: "Capipepo", emoji: "🦔" },
    { name: "Ratigueya", emoji: "🦝" }
];

//lista de ataques
let attacksEmojis = [
    { name: "Fuego", emoji: "🔥" },
    { name: "Agua", emoji: "💧" },
    { name: "Tierra", emoji: "🌱" }
]

//vidas
let vidasJugador = ["❤️","❤️","❤️"]
let vidasEnemigo = ["❤️","❤️","❤️"]

//mascotas seleccionadas
let nameAnimalSelected = "";
let nameAnimalSelectedEnemy = "";
let emojiAnimalSelected = "";
let emojiAnimalSelectedEnemy = "";

//ataques del jugador
function startGame(){
    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque");
    sectionSeleccionarAtaque.style.display = 'none'

    let btnSelect = document.getElementById("btn-select")

    btnSelect.addEventListener("click",selectJugador)

    let btnReset = document.getElementById('btn-reset')
    btnReset.style.display = "none";
    btnReset.addEventListener("click", reiniciarJuego)

    let btnFuego = document.getElementById("btn-fuego") 
    btnFuego.addEventListener("click", showAttack)

    let btnAgua = document.getElementById("btn-agua")
    btnAgua.addEventListener("click", showAttack)

    let btnTierra = document.getElementById("btn-tierra")
    btnTierra.addEventListener("click", showAttack)
    
    console.log(btnFuego.addEventListener("click", showAttack));

}

//mascota del jugador
function selectJugador(){
    numSelect = 0
    if(document.getElementById("hipodoge").checked){
        numSelect = 1
    }else if(document.getElementById("capipepo").checked){
        numSelect = 2
    }else if(document.getElementById("ratigueya").checked){
        numSelect = 3
    }else{
        alert("Debes seleccionar una mascota");
    }

    let spanNameAnimal = document.getElementById("name-player");

    nameAnimalSelected = animalEmojis[numSelect - 1].emoji + animalEmojis[numSelect - 1].name;
    emojiAnimalSelected = animalEmojis[numSelect - 1].emoji;
    spanNameAnimal.innerHTML = `Jugador: ${nameAnimalSelected}`;

    let sectionElegirMascota = document.getElementById('seleccionar_mascota');
    sectionElegirMascota.style.display="none";

    selectEnemy();
}

let attackPlayer =  ""

function showAttack(e){
    let btn = e.currentTarget;
    attackPlayer = btn.textContent;
    console.log(`${attackPlayer}`);

    selectAttackEnemy();
    resultCombat();
    mensaje();
    showLiveStatus();
    reviewlives();
}


//mascota del enemigo
function selectEnemy(){
    let numRandom = getRandom(1,3);
    let spanNameAnimalEnemy = document.getElementById("name-enemy");

    nameAnimalSelectedEnemy = animalEmojis[numRandom - 1].emoji + animalEmojis[numRandom - 1].name;
    emojiAnimalSelectedEnemy = animalEmojis[numRandom - 1].emoji;

    spanNameAnimalEnemy.innerHTML = `Enemigo: ${nameAnimalSelectedEnemy}`

    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque");
    let boxInfoPelea = document.getElementById("mensajes");
    sectionSeleccionarAtaque.style.display = 'flex';
    boxInfoPelea.style.display = 'flex'

}

//ataque del enemigo
let attackEnemy = "";

function selectAttackEnemy(){
    let numRandom = getRandom(1,3);
    attackEnemy = attacksEmojis[numRandom - 1].name + attacksEmojis[numRandom -1 ].emoji;
}

//combate
let combatStatus = ""

// agua > fuego
// fuego > tierra
// tiera > agua
function resultCombat(){

    if(attackPlayer == attackEnemy){
        combatStatus = "EMPATE ⭕"
    }else if(attackPlayer == "Fuego🔥" && attackEnemy == "Tierra🌱"){
        combatStatus = "GANASTE ✅"
        vidasEnemigo.pop();
    }else if(attackPlayer == "Agua💧" && attackEnemy == "Fuego🔥"){
        combatStatus= "GANASTE ✅"
        vidasEnemigo.pop();
    }else if(attackPlayer == "Tierra🌱" && attackEnemy == "Agua💧"){
        combatStatus = "GANASTE ✅"
        vidasEnemigo.pop();
    }else{
        combatStatus = "PERDISTE ❌"
        vidasJugador.pop();
    }
}

//actualizar vidas
function showLiveStatus(){
    let span_lives_player = document.getElementById("lives-player");
    let span_lives_enemy = document.getElementById("lives-enemy");

    span_lives_player.textContent = vidasJugador.toString().replace(/,/g, "");
    span_lives_enemy.textContent = vidasEnemigo.toString().replace(/,/g, "");
}

function reviewlives(){
    if (vidasEnemigo.length == 0){
        mensajeFinal("🎊 GANASTE !!! 😄");
        disabledAttack();

    }else if(vidasJugador.length == 0){
        mensajeFinal("💔 PERDISTE 😔");
        disabledAttack();
    }
}

function disabledAttack(){
    let btnFuego = document.getElementById("btn-fuego");
    let btnAgua = document.getElementById("btn-agua");
    let btnTierra = document.getElementById("btn-tierra");
    
    btnFuego.disabled = true;
    btnAgua.disabled = true;
    btnTierra.disabled = true;
}

//Impresión ataques y resultados
function mensaje(){
    let newP = document.createElement("p");
    let secctionMessage = document.getElementById('mensajes');
    newP.innerHTML = `Jugador ${emojiAnimalSelected}: ${attackPlayer} - Enemigo ${emojiAnimalSelectedEnemy}: ${attackEnemy} ➡ ${combatStatus}`;
    secctionMessage.appendChild(newP);
}

function mensajeFinal(texto){
    let newh = document.createElement("h2");
    let secctionMessage = document.getElementById('mensajes');
    newh.innerHTML = texto + ' GAME OVER'
    secctionMessage.appendChild(newh);
    
    let btnReset = document.getElementById('btn-reset')
    btnReset.style.display = "block";
}

//Reiniciar juego
function reiniciarJuego(){
    location.reload();
}

//obtención de números aleatorios
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}


