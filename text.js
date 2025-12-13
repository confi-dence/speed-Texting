"use strict";

const WelcomeMessage = document.getElementById("WelcomeMessage"),
countDown = document.getElementById("countDown"),
countingnumber = document.getElementById("countingnumber"),
bouncingdot = document.getElementById("bouncingdot"),
speedTexting = document.getElementById("speedTexting"),
userTyped = document.getElementById("userTyped"),
timerDisplay = document.getElementById("timer"),
takeTest = document.getElementById("takeTest")


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



// countDown

let time = 3;
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
      }
    }, 1000);
}   

userTyped.addEventListener("input", CountDown);

takeTest.addEventListener('click', function (params) {
    if(time === -1){
        clearInterval(interval);
        time = 3;
        timerDisplay.textContent = time;
        started = false;
        userTyped.disabled = false
        countDown()
        userTyped.value = '';
    }
})