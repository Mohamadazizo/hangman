const letters = "abcdefghijklmnopqrstuvwxyz";

let arrayletters = Array.from(letters);

let containerletter = document.querySelector(".letters");

arrayletters.forEach(letter => {
    let span = document.createElement("span");
    let spantext = document.createTextNode(letter);
    span.appendChild(spantext);
    containerletter.appendChild(span);
    span.classList.add("con-let")
})

fetch("./hang.json").then(words => words.json()).then(words => {
    // get all key form word
    let allkey = Object.keys(words);
    // get random number form keys
    let randomkey = Math.floor(Math.random() * allkey.length);
    //get key name 
    let nameword = allkey[randomkey];
    // append childe to name elemnete
    document.querySelector('.name').appendChild(document.createTextNode(nameword));
    // create random number from array kay
    let randomword = Math.floor(Math.random() * words[nameword].length);
    // set random word 
    let word = words[nameword][randomword];
    // create letter guss spase 
    let letterspan = document.querySelector(".span-letter");

let letterword = Array.from(word);
    letterword.forEach(letw =>{
        let emptyspan = document.createElement("span");
        letterspan.appendChild(emptyspan);
        emptyspan.classList.add('span-let')
        if( letw === " "){
        emptyspan.classList.add("with-spase")
        }
    })

let drawwrong = document.querySelector('.draw');
let addwrong =0 ;
let winner =0;
let spanletter = document.querySelectorAll(".span-letter span");
document.addEventListener('click' , (e) =>{
    if ( e.target.className === "con-let"){
        let thestatus = false;
        e.target.classList.add('clicked');

        let theclickletter = e.target.innerHTML;
        letterword.forEach((wordletter , index) =>{
            if ( theclickletter === wordletter ){
                thestatus = true;
                winner++ ;
                spanletter.forEach((spanword , spanindex) => {
                    if ( spanindex === index ){
                        spanword.innerHTML = theclickletter
                    }
                })
                if(winner === letterword.length){
                 win()   
                }
            }
        })
        if(thestatus !=true){
                addwrong++;
                drawwrong.classList.add(`wrong-${addwrong}`);
                document.getElementById("fild").play();
            if ( addwrong === 8 ){
                gameover();
                containerletter.classList.add("finished")
            }
        }else{
            document.getElementById("success").play();

        }
    }
})
    function gameover(){
        let div = document.createElement("div");
        let divtext = document.createTextNode(`the game is end and the word is ${word}`);
        div.appendChild(divtext);
        document.querySelector(".container").appendChild(div);
        div.classList.add("popup")
    }
    function win(){
        let div = document.createElement("div");
        let divtext = document.createTextNode(`congrate the word is ${word}`);
        div.appendChild(divtext);
        document.querySelector(".container").appendChild(div);
        div.classList.add("popup")
    }
});
