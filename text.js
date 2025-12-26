"use strict";

const WelcomeMessage = document.getElementById("WelcomeMessage"),
countDown = document.getElementById("countDown"),
countingnumber = document.getElementById("countingnumber"),
bouncingdot = document.getElementById("bouncingdot"),
speedTexting = document.getElementById("speedTexting"),
userTyped = document.getElementById("userTyped"),
timerDisplay = document.getElementById("timer"),
StartAgain = document.getElementById("takeTest"),
CurrentScore = document.getElementById("CurrentScore"),
HighestScore = document.getElementById("HighestScore"),
reward = document.getElementById("reward")


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



// countDown 45  to 0

let time = 45;
let started = false;
let interval;
function CountDown() {
// prevent multiple intervals
    if (started) return; 
    started = true;
  
    interval = setInterval(() => {
        timerDisplay.textContent = time;
      time--;
  
      if (time < 0) {
        endText()
      }
    }, 1000);
} 
// to reset everything

function endText(params) {
    clearInterval(interval);
    // stop typing
   userTyped.disabled = true;
   calculateWPM()
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
         if(userTyped.value.toLowerCase().includes('learning to think fast')){
            endText()
         }
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

StartAgain.addEventListener('click', function ( ) {
   
        clearInterval(interval);
        time = 45;
        timerDisplay.textContent = time;
        started = false;
        userTyped.disabled = false
        CountDown()
        userTyped.value = "";
        CurrentScore.innerText = ""
        startTime = null;
        CurrentScore.innerText = 'Current Speed:'
    
})

function rewardTimeOut(params) {
    setTimeout(() => {
        reward.innerText = ''
    }, 5000);
}

function updateHighestScore(currentValue) {
    const highestValue = Number(HighestScore.textContent) || Infinity;

    if(userTyped.value.toLowerCase().includes('learning to think fast')){
        if (currentValue > highestValue) {
            HighestScore.textContent = currentValue;
            localStorage.setItem('highestScore',currentValue)
            reward.innerText = 'WINNER 🎉🎉🎉'
            rewardTimeOut()
            
        } else if(userTyped.value.toLowerCase().includes('learning to think fas')){
            reward.innerText = 'Good job 👍'
            rewardTimeOut()
        }
    }else{
        reward.innerText = 'Ouch 💔🤧'
        rewardTimeOut()
    }
}
const savemode = localStorage.getItem('highestScore')

if(savemode !== null){
    HighestScore.textContent = savemode;
}


