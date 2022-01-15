const keyboard = document.getElementById('qwerty');
const phrase_ul = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const scoreboard = document.querySelector('ol').children;

let phrases = [
    "JavaScript",
    "Project",
    "Treehouse",
    "Web Development",
    "Coding is fun"
];

let wrong_answers = 0;
let randomPhrase = "";
let phrase_length = 0;//number of toal 'letters'


function remove_overlay(e){

    if(e.target.className === "btn__reset"){
        const btn = e.target;
        if(btn.textContent === "Play Again"){
            console.log("we're playing again");
            reset_gamestate();
        }
            
        overlay.style.display = 'none';
        randomPhrase = getRandPhrase(phrases);
        addPhraseToDisplay(randomPhrase);
        
    }
}

function getRandPhrase(arr){
    const random = Math.floor(Math.random()*phrases.length);
    const ph = phrases[random];
    return ph.split('');
}

function addPhraseToDisplay(arr){
    for(let i = 0; i < arr.length; i++){
        const li = document.createElement('li');
        li.textContent = arr[i];
        if(arr[i] === ' '){
            li.className = 'space';
        }else{
            li.className = 'letter';
            phrase_length++;
        }
        phrase_ul.appendChild(li);
    }


}

function checkLetter(btn){
    let match = null;
    const letters = phrase_ul.children;
    for(let i = 0; i < letters.length; i++){
        li = letters[i];
        if(li.textContent == btn.textContent){
            match = li.textContent;
            li.classList.add('show');
        }
    }

    return match;
}

function keyboard_press(e){
    if(e.target.tagName === 'BUTTON'){
        const btn = e.target;
        const letterFound = checkLetter(btn);
        btn.className = 'chosen';
        if(letterFound === null){
            wrong_answers++;
            scoreboard[scoreboard.length-wrong_answers].firstChild.src = "images/lostHeart.png";
        }
        check_win(wrong_answers);
    }
}

function check_win(wrong_count){
    function show_overlay(state, str){
        overlay.style.display = "";
        overlay.className = state;
        children[0].textContent = str;
        children[1].textContent = "Play Again"
    }
    const show_count = document.querySelectorAll('.show').length;
    const letter_count = document.querySelectorAll('.letter').length;
    const children = overlay.children;
    console.log(children);
    if(show_count === letter_count){
        show_overlay("win", "You Win!");
    }else if(wrong_count === 5){
        show_overlay("lose", "You Lose :(");
    }

}

function reset_gamestate(){
    function removePhrase(){
        // let li_count = phrase_ul.children.length;
        // console.log(`li_count: ${li_count}`);
        while(phrase_ul.children.length != 0){
            phrase_ul.firstChild.remove(); 
        }
    }
    function removeChosen(){
        const chosen_list = document.querySelectorAll(".chosen");
        for(let i = 0; i < chosen_list.length; i++){
            chosen_list[i].className = "";
        }
    }
    function restoreHearts(){
        for(let i = 0; i < scoreboard.length; i++){
            scoreboard[i].firstChild.src = "images/liveHeart.png";
        }
        wrong_answers = 0;
        phrase_length = 0;
    }

    removePhrase();
    removeChosen();
    restoreHearts();  
}

/* _______main______*/
phrases = phrases.map(phrase=>phrase.toLowerCase());
overlay.addEventListener('click', remove_overlay);
keyboard.addEventListener("click", keyboard_press);