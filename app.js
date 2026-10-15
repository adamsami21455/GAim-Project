console.log ('GAim Project')

// Constants
const targetPosition = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']
const nameInputEl = document.querySelector('#playerName') 
const startButtonEl = document.querySelector('#startButton')
const welcomeMessageEl = document.querySelector('#welcomeMessage')
const startScreenEl = document.querySelector('#startScreen')
const gameScreenEl = document.querySelector('#gameScreen')

const playerGreetingEl = document.querySelector('#playerGreeting')
const scoreDisplayEl = document.querySelector('#score')
const gameAreaEl = document.querySelector ('#gameArea')
const targetEl = document.querySelector ('#target')

//variables
let score = 0
let lives = 3


// Cache Stuff
console.log (nameInputEl)
console.log (startButtonEl)
console.log (welcomeMessageEl)
console.log (startScreenEl)
console.log (gameScreenEl)
console.log (playerGreetingEl)
console.log (scoreDisplayEl)
console.log (gameAreaEl)
console.log(targetEl)

//functions
function startGame () {
    const playerName = nameInputEl.value
    if (playerName === "") {
        welcomeMessageEl.textContent = "Please Enter Your name!"
        return;
    }
    else {
        startScreenEl.style.display = "none"
        gameScreenEl.hidden = "false"
        gameScreenEl.style.display = "flex"
        welcomeMessageEl.textContent = "Good luck " + playerName + "!"
    }
}
function addPoints () {
    score += 100
    scoreDisplayEl.textContent = score
    
}
function randomizeTargetPosition () {

}
function removeLife() {

}
function addExtraLife () {

}
function winGame() {

}
// Event listeners
startButton.addEventListener('click',startGame) 
target.addEventListener('click',addPoints)
target.addEventListener('click',randomizeTargetPosition)



// 1. Create a new array representing the spots the target can be placed on
// 2. Create HTML elements that match the number of array positions (same as tictactoe)
// 3. Cache the html elements (querySelectorAll)
// 4. Loop through the array to match the html elements text content
// 5. focus on the randomizer Math.floor(Math.random * array.length)