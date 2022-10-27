const letter = document.getElementById('letter');
const score = document.getElementById('score');
const box = document.querySelector('#box');
const lifes = document.querySelector('.lifes');
const belowText = document.querySelector('#gameOver_Text');
const restartBtn = document.querySelector('#restarGameButton');


//Get the root colors from CSS
let green = getComputedStyle(document.documentElement).getPropertyValue('--green');
let red = getComputedStyle(document.documentElement).getPropertyValue('--red');

    

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

let randomNumber;
let currentLetter;
let loop; 
let gameRunning = false;
let points = 0;
let lifesLeft = 5;
let speed = 1000;
let forNextLevel = 0;



function runGame(speed = 1000){
    loop = setInterval(function() {
        randomNumber = Math.floor(Math.random() * alphabet.length);
        currentLetter = alphabet[randomNumber];
        letter.innerText = (currentLetter);
  }, speed);
};
 
  document.body.addEventListener('keypress',function(e){

    //Enter to Start/Stop games
    if (e.key === 'Enter'){
        if(!gameRunning){
            runGame();
            gameRunning = true;
            letter.innerText = '🏁';
            restartBtn.style.display = 'none';
            gameOver_Text.innerText = ''
            score.innerText = "Go...";
            return;
        } else {
            clearInterval(loop);
            gameRunning = false;
            restartBtn.style.display = 'initial';
            gameOver_Text.innerText = 'Game Paused. Press Enter to Restart, or press Restart Game to star over';
            return;
        }
    }
    
    //KeyWord Checker
    if (e.key.toUpperCase() === currentLetter && gameRunning === true){
        console.log('score');
        points++;
        forNextLevel++;
        box.style.backgroundColor = green;
        if(forNextLevel === 10){
            //LevelUp
            clearInterval(loop);
            letter.innerText = "Level 🆙";
            lifesLeft = 5;
            forNextLevel = 0;
            lifes.setAttribute("data-life", lifesLeft);
            speed -=50;
            runGame(speed);
        }
    } else if (gameRunning === true) {
        points--;
        lifesLeft--;
        box.style.backgroundColor = red;
        lifes.setAttribute("data-life", lifesLeft);
        if (lifesLeft === 0){
            //GameOver
            belowText.innerText = "Game Over..."
            restartBtn.style.display = 'initial';
            clearInterval(loop);
        }
    }
    score.innerText = points;
});

restartBtn.onclick = () => restartGame();

const restartGame = () => {
    clearInterval(loop);
    speed = 1000;
    points = 0;
    lifesLeft = 5;
    forNextLevel = 0;
    restartBtn.style.display = 'none';
    belowText.innerText = ""
    score.innerText = "0";
    box.style.backgroundColor = green;
    lifes.setAttribute("data-life", lifesLeft);
    runGame();
}