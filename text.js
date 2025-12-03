"use strict";

const WelcomeMessage = document.getElementById("WelcomeMessage"),
countDown = document.getElementById("countDown"),
countingnumber = document.getElementById("countingnumber"),
bouncingdot = document.getElementById("bouncingdot"),
speedTexting = document.getElementById("speedTexting")

// setting timeout for opacity

WelcomeMessage.classList.add("welcomeOpacity")
setTimeout(() => {
    WelcomeMessage.classList.remove("welcomeOpacity")
}, 900);

/* setting time out for both
countDown and WelcomeMessage */
setTimeout(() => {
    WelcomeMessage.style.display = "none"
}, 6000);
setTimeout(() => {
    countDown.style.display = "flex"
}, 6500);



// stting time out for my countDown numbers 3,2,1

setTimeout(() => {
    setTimeout(() => {
        countingnumber.innerText  = '3'
    }, 3000);
    setTimeout(() => {
        countingnumber.innerText  = '2'
    }, 4000);
    setTimeout(() => {
        countingnumber.innerText  = "1"  
    }, 6000);
    setTimeout(() => {
        countDown.style.display = "none"
    }, 6600);
    setTimeout(() => {
        speedTexting.style.display = "flex"
    }, 6700);
}, 7000);

// adding my animation for the counting Numbers
setTimeout(() => {
    countDown.classList.add('transfrom')
}, 100);

