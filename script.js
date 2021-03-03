let isFinished = false;

const generateRestartBtn = ()=>{ 
    document.body.innerHTML = `<main>
    <div id="message" class="message">Bravo!</div>
    <div><button id="restartBtn" class="checkBtn" onclick="playAgain()">Igraj ponovo!</button></div>
    </main>`;
}

const checkOrder = (currentWord, word)=>{
let currentLength = currentWord.length;
//pronadjena rec
if(currentLength===word.length){
    return 1;
}
//na dobrom putu
let tempWord= word.substring(0,currentLength);

if(currentWord===tempWord){
    return 0;
}
else{
    return -1;
}  
}

const shuffelWord = (word)=>{
    var shuffledWord = '';
    var letters = word.split('');
    while (letters.length > 0) {
        shuffledWord += letters.splice(letters.length * Math.random() << 0, 1);
    }
    return shuffledWord; 
}
const checkText = ()=>{
    let dysplayedTxt = document.getElementById("wordDysplay");
        if(checkOrder(dysplayedTxt.value, "posao")===1)
        {
            isFinished= true;
            generateRestartBtn();
        }
        if(checkOrder(dysplayedTxt.value, "posao")===-1)
        { 
            isFinished= true;
            playAgain();   
        }
}
const generateChars = ()=>{
    let inputArea = document.getElementById("inputArea");

    //generate random word
    let newWord = shuffelWord("posao");
    let randomChars = newWord.split("");

    //generate buttns
    let generatedButtns="";
    randomChars.forEach((char,index) => {
        generatedButtns +=`<button id="cb${index}" class="charBtn" onclick="addChar(event)">${char}</button>`;
    });
    inputArea.innerHTML = generatedButtns;
}
const addChar = (event)=>{
    let cb = document.getElementById(event.target.id);
    document.getElementById("wordDysplay").value += cb.innerHTML;
    checkText();
    cb.disabled = true;
}

//bolje sa window.screen.width
const timer = ()=>{
    let timeleft = window.innerWidth < 800? 4 : 5;
    let progressBar = document.getElementById("progressBar");
    progressBar.max = timeleft;
    
    let countdownTimer = setInterval(()=>{
      if( progressBar.value >= timeleft || isFinished){    
        clearInterval(countdownTimer);
        if(!isFinished){
            playAgain();
        }
        
      }  
      progressBar.value += 1;
    }, 1000);
}
const playAgain = ()=>{
    window.location.reload(true);
}
let genInterval = setInterval(() => {
    clearInterval(genInterval);
    generateChars();
    timer();
}, 2000);
window.onload = genInterval;


