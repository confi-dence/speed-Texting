"use strict";

const WelcomeMessage = document.getElementById("WelcomeMessage"),
countDown = document.getElementById("countDown"),
countingnumber = document.getElementById("countingnumber"),
bouncingdot = document.getElementById("bouncingdot"),
speedTexting = document.getElementById("speedTexting"),
userTyped = document.getElementById("userTyped"),
timerDisplay = document.getElementById("timer"),
takeTest = document.getElementById("takeTest"),
CurrentScore = document.getElementById("CurrentScore"),
HighestScore = document.getElementById("HighestScore")


if(WelcomeMessage){
    // setting timeout for opacity
    WelcomeMessage.classList.add("welcomeOpacity")
    setTimeout(() => {
        WelcomeMessage.classList.remove("welcomeOpacity")
    }, 1000);

    
/* setting time out for both
countDown and WelcomeMessage */

setTimeout(() => {
    WelcomeMessage.style.display = "none"
    countDown.style.display = "flex"
    StartAfterWelcome()
}, 6000);
}


// stting time out for my countDown numbers 3,2,1

let timeReady = 3;
let startedReday = false;
let intervalRea;
function StartAfterWelcome(params) {
    intervalRea  = setInterval(() => {
        countingnumber.textContent = timeReady
        timeReady--
        if(timeReady < 0){
            countDown.style.display = "none"
            speedTexting.style.display = "flex"
        }
    }, 1000);
}


// adding my animation for the counting Numbers
setTimeout(() => {
    countDown.classList.add('transfrom')
}, 100);



// countDown 30 to 0

let time = 30;
let started = false;
let interval;
function CountDown() {

    if (started) return; // prevent multiple intervals
    started = true;
  
    interval = setInterval(() => {
        timerDisplay.textContent = time;
      time--;
  
      if (time < 0) {
        clearInterval(interval);
        userTyped.disabled = true; // stop typing
        calculateWPM()
      }
    }, 200);
}   

// trigger coundown once tying
// start calulating word per mins
let startTime = null

userTyped.addEventListener("input", function (params) {
    CountDown();
    if (!startTime) {
        startTime = Date.now();
    }
    // calculateWPM();   
 
});


// word per minutes
function calculateWPM() {
    const text = userTyped.value.trim();
  
    const words = text === "" ? 0 : text.split(/\s+/).length;
    const timeInSeconds = ((Date.now() - startTime) / 1000);
    const wpm = timeInSeconds > 0 ? (words / timeInSeconds * 60).toFixed(1) : 0;
  
    CurrentScore.innerText = `Current Speed: ${wpm} WPM`
    updateHighestScore(Number(wpm));

  }


//   to refresh everything once take texst button is triggered

takeTest.addEventListener('click', function ( ) {
    if(time === -1){
        clearInterval(interval);
        time = 30;
        timerDisplay.textContent = time;
        started = false;
        userTyped.disabled = false
        CountDown()
        userTyped.value = "";
        CurrentScore.innerText = ""
        startTime = null;
        CurrentScore.innerText = 'Current Speed:'
    }
})


function updateHighestScore(currentValue) {
    const highestValue = Number(HighestScore.textContent) || Infinity;

    if(userTyped.value.toLowerCase().includes('learning to think fast')){
        if (currentValue < highestValue) {
            HighestScore.textContent = currentValue;
            localStorage.setItem('highestScore',currentValue)
        }else if (currentValue > highestValue){
           (HighestScore).textContent = `${highestValue} WPM`;
        }
    }
}
const savemode = localStorage.getItem('highestScore')

if(savemode !== null){
    HighestScore.textContent = savemode;
}
