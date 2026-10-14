console.log ('GAim Project')

// Constants
const nameInputEl = document.getElementById("playerName") 
const startButtonEl = document.getElementById("startButton")
const welcomeMessageEl = document.getElementById("welcomeMessage")

// Cache Stuff
console.log (nameInputEl)
console.log (startButtonEl)
console.log (welcomeMessageEl)

//functions
function startGame () {
    const playerName = nameInputEl.value
    if (playerName === "") {
        welcomeMessageEl.textContent = "Pleaes enter your Name!"
        return;
    }
    else {
        welcomeMessageEl.textContent = "Good luck " + playerName + "!"
    }
}
// Event listeners
startButton.addEventListener('click',startGame) 
