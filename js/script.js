
let box = document.getElementById("grid").getElementsByTagName("div");
let button = document.getElementsByTagName("button");
let token = 0;
let altPlayer = 0;

document.addEventListener('contextmenu', function (event){
    event.preventDefault();
});

for (let i = 0 ; i < box.length ; i++)
{
    box[i].addEventListener("contextmenu", function (){
        if (token === 0){
            player2(i);
        }

    });

   box[i].addEventListener("click", function (){
        if (altPlayer === 0){
            player1(i);
        }
        else{
            player2(i);
        }
        if (token === 1){
            botPlay();
        }
    });
}

for (let i = 0 ; i < button.length ; i++)
{
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

function restart() {
    for (let i = 0 ; i < box.length ; i++)
    {
        box[i].removeAttribute("id");
        box[i].removeAttribute("style");
        altPlayer = 0;
    }
}

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
        if (box[i].id != ""){
            nbId += 1;
        }
    }
    if (nbId === box.length){
        winner("draw");
    }
}

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
    }
}

function botPlay(){
    for (let i = 0 ; i < box.length ; i++){
        player2(i);
    }
}

function player2 (i){
    if (altPlayer === 1) {
        if (box[i].id === "") {
            box[i].id = "round";
            box[i].style.backgroundColor = "#085394";
            testVictory();
            altPlayer = 0;
        }
    }
}

function player1 (i){
    if (altPlayer === 0){
        if (box[i].id === ""){
            box[i].id = "cross";
            box[i].style.backgroundColor = "#009d0e";
            testVictory();
            altPlayer = 1;
        }
    }
}