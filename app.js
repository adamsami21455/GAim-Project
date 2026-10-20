console.log('GAim Project')

// Constants

const nameInputEl = document.querySelector('#playerName')
const startButtonEl = document.querySelector('#startButton')
const welcomeMessageEl = document.querySelector('#welcomeMessage')
const startScreenEl = document.querySelector('#startScreen')
const gameScreenEl = document.querySelector('#gameScreen')
const resultOverlayEl = document.querySelector('#resultOverlay')
const resultTitleEl = document.querySelector('#resultTitle')
const resultMessageEl = document.querySelector('#resultMessage')
const finalScoreEl = document.querySelector('#finalScore')
const finalPersonalBestEl = document.querySelector('#finalPersonalBest')
const returnButtonEl = document.querySelector('#returnButton')

const squaresEl = document.querySelectorAll('.sqr')
const logoEl = document.querySelector('#logoContainer')
const livesEl = document.querySelector('#lives')
const comboEl = document.querySelector('#combo')

const playerGreetingEl = document.querySelector('#playerGreeting')
const scoreDisplayEl = document.querySelector('#score')
const gameAreaEl = document.querySelector('#gameArea')
const targetEl = document.querySelector('#target')
const expTargetEl = document.querySelector('#expTarget')
const barrierEl = document.querySelector('#barrier')
const timerEl = document.querySelector('#timer')
const personalBestEl = document.querySelector('#personal-best')

const targetSound = new Audio('./game-files/orb.mp3')
const bombSound = new Audio('./game-files/explosion.mp3')


//variables
let playerName = ""
let score = 0
let combo = 0
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
let personalBest = Number(localStorage.getItem('gaimPersonalBest') || 0)



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
console.log(comboEl)

//functions
function startGame() {
    playerName = nameInputEl.value.trim()
    if (playerName === "") {
        welcomeMessageEl.textContent = "Please Enter Your name!"
        return;
    }
    else {
        startScreenEl.style.display = "none"
        gameScreenEl.style.display = "flex"
        logoEl.style.display = "none"
        resultOverlayEl.style.display = "none"


    }
    // Reset game values


    score = 0
    scoreDisplayEl.textContent = score

    combo = 0
    comboEl.textContent = combo

    livesArray = ["❤️", "❤️", "❤️"]
    livesEl.textContent = livesArray.join("")

    timer = 0
    timerEl.textContent = timer

    bombCount = 1
    document.querySelectorAll('.extra-bomb').forEach(bomb => { bomb.remove() })

    gameEnded = false


    gameTimer()
    randomizeTargetPosition()
    explodingTarget()
    // a function call that loads up the exploding target
}
function addPoints() {
    if (gameEnded === true) {
        return
    }
    targetSound.currentTime = 0
    targetSound.play()
    score += 100
    combo += 1
    scoreDisplayEl.textContent = score
    comboEl.textContent = combo


}

function moveToRandomSquare(targetToMove) { // this function makes sure that the targets do not over lap
    if (gameEnded === true) {
        return
    }

    const availableSquares = Array.from(squaresEl).filter(square => {
        return !square.contains(targetEl) &&
            !square.contains(expTargetEl)
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
    explodingIntervalId = setInterval(function () {
        moveToRandomSquare(expTargetEl)
    }, 1500)

}
function createBomb() {
    const bomb = document.createElement('button')
    bomb.innerHTML = '<img src= "./game-files/bomb.png" alt ="bomb">'
    bomb.classList.add('bomb', 'extra-bomb')

    bomb.addEventListener('click', function () {
        if (gameEnded === false) {
            removeLife()

        }

    })
    moveToRandomSquare(bomb)

    extraBombIntervalId = setInterval(function () {
        moveToRandomSquare(bomb)
    }, 1500)
}
function increaseBombs() {
    if (timer >= 15 && bombCount < 2) {
        bombCount = 2
        createBomb()
    }
    if (timer >= 30 && bombCount < 3) {
        bombCount = 3
        createBomb()
    }
    if (timer >= 45 && bombCount < 4) {
        bombCount = 4
        createBomb()
    }
    if (timer >= 50 && bombCount < 5) {
        bombCount = 5
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
    bombSound.currentTime = 0
    bombSound.play()
    loseGame()

}
//function (addBarrier)  {}

function showResult(won) {
    if (gameEnded) {
        return
    }
    else {
        gameEnded =
            true
        clearInterval(intervalId)
        clearInterval(targetIntervalId)
        clearInterval(explodingIntervalId)
        clearInterval(extraBombIntervalId)
    }
    // personal best saved
    if (score > personalBest) {
        personalBest = score
        localStorage.setItem('gaimPersonalBest', personalBest)
    }
    //Result panel
   
    if (won === true) {
        resultTitleEl.textContent = `You win! ${playerName}`
        resultMessageEl.textContent = "Good aim!"

    }
    else {
        resultTitleEl.textContent = "Game Over!"
        resultMessageEl.textContent = `Keep practicing ${playerName}`

    }

    finalScoreEl.textContent = score
    finalPersonalBestEl.textContent = personalBest
    personalBestEl.textContent = personalBest

    resultOverlayEl.style.display = "flex"
}
function loseGame() {
    if ((livesArray.length === 0 || timer >= 60) && gameEnded === false) {

        if (livesArray.length === 0) {
            showResult(false)
        }
        else if (score >= 5000) {
            showResult(true)
        }
        else {
            showResult(false)
        }

    }
}

function returnToStartScreen() {
    gameScreenEl.style.display = "none"
    resultOverlayEl.style.display = "none"
    startScreenEl.style.display = "flex"
    logoEl.style.display = "flex"

}


// Event listeners
startButtonEl.addEventListener('click', startGame)
targetEl.addEventListener('click', addPoints)
expTargetEl.addEventListener('click', removeLife)
returnButtonEl.addEventListener('click', returnToStartScreen)


