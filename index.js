//Track the number of turns
let turns = 3;
const choices = ["rock", "paper", "scissors"]
let content = ''

//Get all buttons using querySelectorAll 
const selectionButtons = document.querySelectorAll('[id]')
const heading = document.querySelector('.game-container h3')
const results = document.querySelector('.results')

const getRandomImageId = () => {
    return choices[Math.floor(Math.random() * choices.length)]
}

function disableButtons(){
    selectionButtons.forEach(selectionButton => {
        selectionButton.disabled = true
        selectionButton.classList.add('disable-pointer')
    })
}

function enableButtons(){
    selectionButtons.forEach(selectionButton => {
        selectionButton.disabled = false
        selectionButton.classList.remove('disable-pointer')
    })
}

function checkWinner(userImage, botImage){
    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    }

    const result = document.createElement("p")
    
    if (userImage === botImage) {
        result.textContent = "It's a tie!👊"
        result.classList.add('tie')
    } else if(winConditions[userImage] == botImage){
        result.textContent = "You win!🔥"
        result.classList.add('win')
    } else {
        result.textContent = "Bot wins!😔"
        result.classList.add('lose')
    }
    results.appendChild(result)

    turns--;
    
    if (turns == 1){
        content = `You have only ${turns} turn left!`
    } else if (turns == 0) {
        content = `You are done with your turns`
    } else {
        content = `You have ${turns} turns`
    }

    //Add updated content to h3 element
    heading.textContent = content;
    console.log(heading.textContent);

}

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', (e) => {
        if (turns == 0) {
            disableButtons()
            content = "Game over! Please refresh to play again.";

            //Add updated content to p element
            heading.textContent = content;
        } else {
            disableButtons()
            const clickedImage = selectionButton.id
            const userTag = document.createElement("p")
            userTag.textContent = `You selected ${clickedImage}`
            results.appendChild(userTag)
        
            //Get bot response
            setTimeout(() => {
                const botImage = getRandomImageId()
                const botTag = document.createElement("p")
                botTag.textContent = `Bot selected ${botImage}`
                results.appendChild(botTag)
                checkWinner(clickedImage, botImage)
                enableButtons() //Re-enable clicks after checking the winner
            }, 1000)
        }
    })
})


