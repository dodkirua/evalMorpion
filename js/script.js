
let box = document.getElementById("grid").getElementsByTagName("div");
let button = document.getElementsByTagName("button");
let token = 0;
let altPlayer = 0;
let secret = 0;

/**
 *  stop right clic menu
 */
document.addEventListener('contextmenu', function (event){
    event.preventDefault();
});

/**
 * listener for grid
 */
for (let i = 0 ; i < box.length ; i++){
    box[i].addEventListener("contextmenu", function (){
        if (token === 0){
            if (secret === 0){
                player2(i);
            }
            else {
                player2Secret(i);
            }
        }

    });

   box[i].addEventListener("click", function (){
        if (altPlayer === 0){
            if (secret === 0){
                player1(i);
            }
            else {
                player1Secret(i);
            }
        }
        else{
            if (secret === 0){
                player2(i);
            }
            else {
                player2Secret(i);
            }
        }
        if (token === 1){
            if (secret === 0){
                botPlay(i);
            }
            else {
                botPlaySecret(i);
            }
        }
    });
}
/**
 * listener for button
 */
for (let i = 0 ; i < button.length ; i++){
    button[i].addEventListener("click", function (){
        switch (this.innerHTML){
            case "Human":
                token = 0;
                restart();
                break;
            case "Bot":
                token = 1;
                restart();
                break;
            case "Restart" :
                restart();
                break;
            default:
                break;
        }
    });
}

button[2].addEventListener("dblclick", function (){
    secret = 1;
})

button[0].addEventListener("dblclick", function (){
    secret = 0;
})

/**
 *  reset the grid
 */
function restart() {
    for (let i = 0 ; i < box.length ; i++)
    {
        box[i].removeAttribute("id");
        box[i].removeAttribute("style");
        box[i].innerHTML = "";
        altPlayer = 0;
    }
}

/**
 *  function for the victory
 */
function testVictory(){

    for (let i = 0 ; i < 9 ; i = i+3 ){
        if (box[i].id === box[i+1].id && box[i].id ===box[i+2].id){
            winner(box[i].id);
        }
    }
    for (let i = 0 ; i < 3 ;  i++ ){
        if (box[i].id === box[i+3].id && box[i].id ===box[i+6].id){
            winner(box[i].id);
        }
    }

    if(box[0].id === box[4].id && box[0].id ===box[8].id){
        winner(box[0].id);
    }
    if(box[2].id === box[4].id && box[2].id ===box[6].id){
        winner(box[2].id);
    }

    let nbId = 0;
    for (let i = 0 ; i < box.length ; i++) {
        if (box[i].id !== ""){
            nbId += 1;
        }
    }
    if (nbId === box.length){
        winner("draw");
    }
}

/**
 * function for the winner message
 * @param win
 */
function winner(win) {
    switch (win){
        case "cross":
            alert("Bravo Joueur 1");
            restart();
            break;
        case "round":
            alert("Bravo Joueur 2");
            restart();
            break;
        case "draw":
            alert("Match nul");
            restart();
            break;
        case "beer":
            alert("Bravo Joueur 1 tu paie une bière au joueur 2");
            restart();
            break;
        case "coffee":
            alert("Bravo Joueur 2 tu paie un café au joueur 1");
            restart();
            break;
    }
}

/**
 *  function for the turn of bot
 */
function botPlay(){
    for (let i = 0 ; i < box.length ; i++){
        player2(i);
    }
}

function botPlaySecret(){
    for (let i = 0 ; i < box.length ; i++){
        player2Secret(i);
    }
}

/**
 * function for player turn
 * @param i
 */
function player2 (i){
    if (altPlayer === 1) {
        if (box[i].id === "") {
            box[i].id = "round";
            box[i].style.backgroundColor = "#085394";
            setTimeout(testVictory,3000);
            altPlayer = 0;
        }
    }
}

function player2Secret (i){
    if (altPlayer === 1) {
        if (box[i].id === "") {
            box[i].id = "coffee";
            box[i].style.backgroundColor = "#085394";
            box[i].innerHTML = "<i class=\"fas fa-coffee\"></i>"
            setTimeout(testVictory,3000);
            altPlayer = 0;
        }
    }
}

function player1 (i){
    if (altPlayer === 0){
        if (box[i].id === ""){
            box[i].id = "cross";
            box[i].style.backgroundColor = "#009d0e";
            setTimeout(testVictory,3000);
            altPlayer = 1;
        }
    }
}

function player1Secret (i){
    if (altPlayer === 0){
        if (box[i].id === ""){
            box[i].id = "Beer";
            box[i].style.backgroundColor = "#009d0e";
            box[i].innerHTML = "<i class=\"fas fa-beer\"></i>"
            setTimeout(testVictory,3000);
            altPlayer = 1;
        }
    }
}