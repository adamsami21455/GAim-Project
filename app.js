console.log('GAim Project')

// Constants

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
const personalBestEl = document.querySelector('#personal-best')
//variables
let score = 0
let livesTracker = "❤️❤️❤️"
let livesArray = ["❤️", "❤️", "❤️"]
let barriers = 0
let timer = 0
let bombCount = 1

let intervalId
let targetIntervalId
let explodingIntervalId
let extraBombIntervalId
let gameEnded = false
let personalBest = 0



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
    // Reset game values
        

        score = 0
        scoreDisplayEl.textContent = score

        livesArray = ["❤️", "❤️", "❤️"]
        livesEl.textContent = livesArray.join("")

        timer = 0
        timerEl.textContent = timer

        bombCount = 1
        document.querySelectorAll('.extra-bomb').forEach(bomb => {bomb.remove()})

        gameEnded = false


    gameTimer()
    randomizeTargetPosition()
    explodingTarget()
    // a function call that loads up the exploding target
}
function addPoints() {
    score += 100
    scoreDisplayEl.textContent = score

    winGame()

}

function moveToRandomSquare(targetToMove) { // this function makes sure that the targets do not over lap
    if (gameEnded === true) {
        return
    }

    const availableSquares = Array.from(squaresEl).filter(square => {
        return square.children.length === 0
    }
    )
    if (availableSquares.length === 0) {
        return

    }
    else {
        const randomIndex = Math.floor((Math.random() * availableSquares.length))
        availableSquares[randomIndex].appendChild(targetToMove)
    }


}

function randomizeTargetPosition() {
    targetIntervalId = setInterval(function randomizeTargetPosition() {
        moveToRandomSquare(targetEl)
    }, 1500)
}


function explodingTarget() {
    explodingIntervalId = setInterval(function() {
        moveToRandomSquare (expTargetEl)
    }, 1500)

}
function createBomb () {
    const bomb = document.createElement('button')
    bomb.textContent = 'Bomb'
    bomb.classList.add('bomb','extra-bomb')

    bomb.addEventListener('click', function () {
        if (gameEnded === false) {
            removeLife()
        
        }
    })
    moveToRandomSquare(bomb)

    extraBombIntervalId = setInterval (function () {
        moveToRandomSquare (bomb)
    }, 1500)
}
function increaseBombs () {
    if (timer >= 5 && bombCount < 2) {
        bombCount = 2
        createBomb()
    }
      if (timer >= 20 && bombCount < 3) {
        bombCount = 3
        createBomb()
    }
      if (timer >= 30 && bombCount < 4) {
        bombCount = 4
        createBomb()
    }   
}

function gameTimer() {
    intervalId = setInterval(function gameTimer() {
        timer += 1
        timerEl.textContent = timer
        increaseBombs()
        loseGame()
    }, 1000)

}



function removeLife() {
    if (livesArray.length > 0) {
        livesArray.pop()
        livesEl.textContent = livesArray.join("")
        console.log(`Life lost ${livesArray}`)
    }
        loseGame()

}
//function (addBarrier)  {}

function loseGame() {
    if ((livesArray.length === 0 || timer >= 60) && gameEnded === false) {
        gameEnded = true
        clearInterval(intervalId)
        clearInterval(targetIntervalId)
        clearInterval(explodingIntervalId)
        clearInterval(extraBombIntervalId)
        timer = 0
        timerEl.textContent = timer

        // personal best
        if (score > personalBest){
            personalBest = score
        personalBestEl.textContent = personalBest
        }

        alert(`Game Over! Your score: ${score}`)
        returnToStartScreen()
    }
    
}
function winGame() {
    if (score >= 1000 && timer < 60 && gameEnded === false ) {
        gameEnded = true
        clearInterval(intervalId)
        clearInterval(targetIntervalId)
        clearInterval(explodingIntervalId)
        clearInterval (extraBombIntervalId)
        timer = 0
        timerEl.textContent = timer
        alert("game won")
        returnToStartScreen()

    }

}

function returnToStartScreen() {
    gameScreenEl.style.display = "none"
    startScreenEl.style.display = "flex"
    logoEl.style.display = "flex"
}


// Event listeners
startButtonEl.addEventListener('click', startGame)
targetEl.addEventListener('click', addPoints)
expTargetEl.addEventListener('click', removeLife)



// 1. Create a new array representing the spots the target can be placed on
// 2. Create HTML elements that match the number of array positions (same as tictactoe)
// 3. Cache the html elements (querySelectorAll)
// 4. Loop through the array to match the html elements text content
// 5. focus on the randomizer Math.floor(Math.random * array.length)