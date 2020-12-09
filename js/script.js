
let box = document.getElementById("grid").getElementsByTagName("div");
let button = document.getElementsByTagName("button");
let token = 0;
let altPlayer = 0;
console.log(box[0]);



for (let i = 0 ; i < box.length ; i++)
{
    box[i].addEventListener("click", function (){
        if (altPlayer === 0){
            if (this.id === ""){
                this.id = "cross";
                this.style.backgroundColor = "#009d0e";
                testVictory();
            }
            altPlayer = 1;
        }
    });
}

document.addEventListener('contextmenu', function (event){
    event.preventDefault();
});

for (let i = 0 ; i < box.length ; i++)
{
    box[i].addEventListener("contextmenu", function (){
        if (altPlayer === 1) {
            if (this.id === "") {
                this.id = "round";
                this.style.backgroundColor = "#085394";
                testVictory();
            }
            altPlayer = 0;
        }
    });
}

for (let i = 0 ; i < box.length ; i++)
{
    box[i].addEventListener("dblclick", function (){
        if (altPlayer === 1) {
            if (this.id === "") {
                this.id = "round";
                this.style.backgroundColor = "#085394";
                testVictory();
            }
            altPlayer = 0;
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
    let nbId = 0;
    for (let i = 0 ; i < box.length ; i++) {
        if (box[i].id != ""){
            nbId += 1;
        }
    }
    if (nbId === box.length){
        winner("draw");
    }
    if (box[0].id === box[1].id && box[0].id ===box[2].id){
        winner(box[0].id);
    }
    if(box[3].id === box[4].id && box[3].id === box[5].id){
        winner(box[3].id);
    }
    if(box[6].id === box[7].id && box[6].id ===box[8].id){
        winner(box[6].id);
    }
    if(box[0].id === box[4].id && box[0].id ===box[8].id){
        winner(box[0].id);
    }
    if(box[2].id === box[4].id && box[2].id ===box[6].id){
        winner(box[2].id);
    }
    if(box[0].id === box[3].id && box[0].id ===box[6].id){
        winner(box[0].id);
    }
    if(box[1].id === box[4].id && box[1].id ===box[7].id){
        winner(box[1].id);
    }
    if(box[2].id === box[5].id && box[2].id ===box[8].id){
        winner(box[2].id);
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