console.log('GAim Project')

// Constants
const targetPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35]

const nameInputEl = document.querySelector('#playerName')
const startButtonEl = document.querySelector('#startButton')
const welcomeMessageEl = document.querySelector('#welcomeMessage')
const startScreenEl = document.querySelector('#startScreen')
const gameScreenEl = document.querySelector('#gameScreen')
const squaresEl = document.querySelectorAll('.sqr')
const logoEl = document.querySelector('#logoContainer')
const livesEl = document.querySelector('#lives')

const playerGreetingEl = document.querySelector('#playerGreeting')
const scoreDisplayEl = document.querySelector('#score')
const gameAreaEl = document.querySelector('#gameArea')
const targetEl = document.querySelector('#target')
const expTargetEl = document.querySelector('#expTarget')
const barrierEl = document.querySelector('#barrier')
const timerEl = document.querySelector('#timer')
//variables
let score = 0
let livesTracker = "❤️❤️❤️"
let livesArray = ["❤️", "❤️", "❤️"]
let barriers = 0
let timer = 0





// Cache Stuff
console.log(nameInputEl)
console.log(startButtonEl)
console.log(welcomeMessageEl)
console.log(logoEl)
console.log(livesEl)
console.log(startScreenEl)
console.log(gameScreenEl)
console.log(playerGreetingEl)
console.log(scoreDisplayEl)
console.log(gameAreaEl)
console.log(targetEl)
console.log(squaresEl)
console.log(expTargetEl)

//functions
function startGame() {
    const playerName = nameInputEl.value
    if (playerName === "") {
        welcomeMessageEl.textContent = "Please Enter Your name!"
        return;
    }
    else {
        startScreenEl.style.display = "none"
        gameScreenEl.style.display = "flex"
        logoEl.style.display = "none"
        welcomeMessageEl.textContent = "Good luck " + playerName + "!"
    }
    gameTimer()
    randomizeTargetPosition()
    explodingTarget()
    // a function call that laods up the exploding target
}
function addPoints() {
    score += 100
    scoreDisplayEl.textContent = score

}
function randomizeTargetPosition() {
    setInterval(function randomizeTargetPosition() {
        // find random position of target
        const randomIndex = Math.floor((Math.random() * squaresEl.length))
        const randomSquare = squaresEl[randomIndex]
        // puts the target in a random square
        randomSquare.appendChild(targetEl)
    }, 1500)
}



function gameTimer() {
    setInterval(function gameTimer() {
        timer += 1
        timerEl.textContent = timer
    }, 1000)
}
function explodingTarget() {
    setInterval(function explodingTarget() {
        const randomIndex = Math.floor((Math.random() * squaresEl.length))
        const randomSquare = squaresEl[randomIndex]
        // puts the target in a random square
        randomSquare.appendChild(expTargetEl)
    }, 1500)

}


function removeLife() {
    if (livesArray.length > 0) {
        livesArray.pop()
        livesEl.textContent = livesArray.join("")
        console.log(`Life lost ${livesArray}`)
    }
    if (livesArray.length === 0 ) {
        loseGame()
    }
}


function loseGame() {
        alert("Game Over")

}
function winGame() {
    if (score === 1000) {
        alert("game won")


    }

}


// Event listeners
startButton.addEventListener('click', startGame)
target.addEventListener('click', addPoints)
expTarget.addEventListener('click', removeLife)



// 1. Create a new array representing the spots the target can be placed on
// 2. Create HTML elements that match the number of array positions (same as tictactoe)
// 3. Cache the html elements (querySelectorAll)
// 4. Loop through the array to match the html elements text content
// 5. focus on the randomizer Math.floor(Math.random * array.length)