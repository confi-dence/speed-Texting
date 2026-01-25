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
reward = document.getElementById("reward"),
Reset = document.getElementById("Reset"),
// maindashbox = document.getElementById("maindashbox"),
wordsdisplayed = document.getElementById("wordsdisplayed"),
modal = document.getElementById("modal"),
close = document.getElementById("close"),
openModal = document.getElementById("openModal"),
maindashbox = document.getElementById("maindashbox"),
box = document.getElementById("box")


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
    // QuickMessage.innerText = ' Start by tying.....'


// adding my animation for the counting Numbers
setTimeout(() => {
    countDown.classList.add('transfrom')
}, 100);



// countDown 45  to 0

let time = 60;
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
// to  everything

function endText(params) {
    clearInterval(interval);
    // stop typing
   userTyped.disabled = true;
   calculateWPM()
}

// trigger coundown once tying
// start calulating word per mins
let startTime = null
let phrases = [
    'day to improve skill',
    'day to get better',
    'confidence speed and skill',
    'learning to think well',
    'learning to think calm',
    'learning to think fast',
    'building to think fast',
    'improve in skill play',
    'perform in coding game',
    'improve in skill play',
];
  userTyped.addEventListener("input", function (params) {
    CountDown();
    if (!startTime) {
        startTime = Date.now();
    }
    // calculateWPM();
    
    let typed = userTyped.value.toLowerCase();
         if (phrases.some(p => typed.includes(p))) {
            endText();
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

function Beginnering(params) {
    clearInterval(interval);
    time = 60;
    timerDisplay.textContent = time;
    started = false;
    userTyped.disabled = false
    userTyped.value = "";
   
    startTime = null;
    CurrentScore.innerText = 'Current Speed:'
}

// randomText


StartAgain.addEventListener('click', function (params) {
    Beginnering()
    CountDown();
    runText()
}
)
function runText(params) {
    let text = [
       "Practice a little every day to improve skill.\n Learning to type is learning to think fast.",
       "Learning to type helps you work faster today. \n Practice a little each day to get better.",
       "Typing daily helps you write clearly and fast. \n Daily effort builds confidence speed and skill.",
       "Victory is the way of small actions repeated daily.\n Learning to type is learning to think well",
       "Progress is the sum of small efforts repeated daily.\n Practice to type is learning to think calm",
       "Typing daily helps you write clearly and fast. \n Daily effort builds confidence speed and skill.",
       "Success is the sum of small efforts repeated daily.\n Learning to type is learning to think fast",
       "Victory is the sum steady actions growing daily.\n Training to master is building to think fast",
       "Focused on the joy of clean coding practice daily.\n Keyboard is easy to improve in skill play",
       "Focused on the art of clean coding patterns today\n Keyboard is built to perform in coding game"
       
    ]
    
    let textIndex= text[ Math.floor(Math.random()* text.length)]
    wordsdisplayed.innerText = textIndex
    
}
window.addEventListener('load', runText)

Reset.addEventListener('click', function (params) {
  HighestScore.innerText = 0
  Beginnering()
})

function rewardTimeOut(params) {
    setTimeout(() => {
        reward.innerText = ''
    }, 5000);
}

function updateHighestScore(currentValue) {
    const highestValue = Number(HighestScore.textContent);
    let typed = userTyped.value.toLowerCase();
    if( phrases.some(p => typed.includes(p)) ){
        if (currentValue > highestValue) {
            HighestScore.textContent = currentValue ;
            localStorage.setItem('highestScore',currentValue)
            reward.innerText = 'WINNER 🎉🎉🎉'
            rewardTimeOut()
            updateapi()
            
        } else if(phrases.some(p => typed.includes(p))) {
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
    HighestScore.textContent = savemode ;
}


openModal.addEventListener('click', function (params) {
    modal.style.display= "flex"
    getMessages()
    speedTexting.style.display = "none"
})

close.addEventListener('click', function (params) {
    modal.style.display= "none"
    speedTexting.style.display = "flex"
})

// implementing the backend part of the code

const api = 'http://127.0.0.1:8000/score/'
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value

// const api = "http://127.0.0.1:8000/score/add/";


function updateapi() {
    fetch(`${api}add/`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            username: localStorage.getItem("username"),
            score: Number(HighestScore.textContent)
        })
    })
    .then(() => getMessages())
    .catch(err => console.error(err));
}


function getMessages() {
    fetch(`${api}get/`)
    .then(res => res.json())
    .then(data => {
        box.replaceChildren();

        data.forEach((m, index) => {
            const div = document.createElement("div");
            div.textContent = `${index + 1}. ${m.username} : ${Number(m.score).toFixed(1)}`;
            box.appendChild(div);
            if (m.username === currentUsername) {
                div.style.backgroundColor = "#d1f7d6";
            }
            
        });
    })
    .catch(err => console.error(err));
}


const username = localStorage.getItem("username");

if (!username) {
    const name = prompt("Enter your username");
    localStorage.setItem("username", name);
}



