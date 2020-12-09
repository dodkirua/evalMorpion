
let box = document.getElementById("grid").getElementsByTagName("div");
let button = document.getElementsByTagName("button");
let token = 0;
let altPlayer = 0;
let secret = 0;
let botIt = [4,2,6,8,0,1,3,5,7];


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
        box[i].removeAttribute("class");
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
        if (box[i].className === box[i+1].className && box[i].className ===box[i+2].className){
            winner(box[i].className);
        }
    }
    for (let i = 0 ; i < 3 ;  i++ ){
        if (box[i].className === box[i+3].className && box[i].className ===box[i+6].className){
            winner(box[i].className);
        }
    }

    if(box[0].className === box[4].className && box[0].className ===box[8].className){
        winner(box[0].className);
    }
    if(box[2].className === box[4].className && box[2].className ===box[6].className){
        winner(box[2].className);
    }

    let nbclassName = 0;
    for (let i = 0 ; i < box.length ; i++) {
        if (box[i].className !== ""){
            nbclassName += 1;
        }
    }
    if (nbclassName === box.length){
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
    for (let i = 0; i < botIt.length ; i++)
    if (box[botIt[i]].className === ""){
        player2(botIt[i]);
    }

}

function botPlaySecret(){
    for (let i = 0; i < botIt.length ; i++)
        if (box[botIt[i]].className === ""){
            player2Secret(botIt[i]);
        }
}

/**
 * function for player turn
 * @param i
 */
function player2 (i){
    if (altPlayer === 1) {
        if (box[i].className === "") {
            box[i].className = "round";
            box[i].style.backgroundColor = "#085394";
            setTimeout(testVictory,3000);
            altPlayer = 0;
        }
    }
}

function player2Secret (i){
    if (altPlayer === 1) {
        if (box[i].className === "") {
            box[i].className = "coffee";
            box[i].style.backgroundColor = "#085394";
            box[i].innerHTML = "<i class=\"fas fa-coffee\"></i>"
            setTimeout(testVictory,3000);
            altPlayer = 0;
        }
    }
}

function player1 (i){
    if (altPlayer === 0){
        if (box[i].className === ""){
            box[i].className = "cross";
            box[i].style.backgroundColor = "#009d0e";
            setTimeout(testVictory,3000);
            altPlayer = 1;
        }
    }
}

function player1Secret (i){
    if (altPlayer === 0){
        if (box[i].className === ""){
            box[i].className = "beer";
            box[i].style.backgroundColor = "#009d0e";
            box[i].innerHTML = "<i class=\"fas fa-beer\"></i>"
            setTimeout(testVictory,3000);
            altPlayer = 1;
        }
    }
}