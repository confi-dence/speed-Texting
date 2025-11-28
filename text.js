"use strict";

const WelcomeMessage = document.getElementById("WelcomeMessage"),
countDown = document.getElementById("countDown"),
countingnumber = document.getElementById("countingnumber"),
bouncingdot = document.getElementById("bouncingdot")

WelcomeMessage.classList.add("welcomeOpacity")
setTimeout(() => {
    WelcomeMessage.classList.remove("welcomeOpacity")
}, 900);
setTimeout(() => {
    WelcomeMessage.style.display = "none"
}, 6000);
setTimeout(() => {
    countDown.style.display = "flex"
}, 6500);
setTimeout(() => {
    setTimeout(() => {
        countingnumber.innerText  = '2'
    }, 2500);
    setTimeout(() => {
        countingnumber.innerText  = "1"  
    }, 4000);
    setTimeout(() => {
        countDown.style.display = "none"
    }, 5000);
}, 5700);
