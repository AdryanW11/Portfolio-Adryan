
const paddleLeft = document.getElementById('paddleLeft');
const paddleRight = document.getElementById('paddleRight');
const ball = document.getElementById('ball');
const gameArea = document.getElementById('gameArea');
const scorePlayer1 = document.getElementById('scorePlayer1');
const scorePlayer2 = document.getElementById('scorePlayer2');
const toggleAIButton = document.getElementById('toggleAI');


let ballSpeedX = 4;
let ballSpeedY = 4;
let ballPosX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
let ballPosY = gameArea.clientHeight / 2 - ball.clientHeight / 2;


let paddleSpeed = 10;
let paddleLeftY = paddleLeft.offsetTop;
let paddleRightY = paddleRight.offsetTop;

// pontos
let score1 = 0;
let score2 = 0;

let isAutoMode = false;

toggleAIButton.addEventListener('click', function() {
    isAutoMode = !isAutoMode;
    toggleAIButton.textContent = `Player 2 Auto Mode: ${isAutoMode ? 'ON' : 'OFF'}`;
});

document.addEventListener('keydown', function(event) {
    //o jogador da esquerda joga com o w,s
    if (event.key === 'w' && paddleLeftY > 0) {
        paddleLeftY -= paddleSpeed;
    } else if (event.key === 's' && paddleLeftY < gameArea.clientHeight - paddleLeft.clientHeight) {
        paddleLeftY += paddleSpeed;
    }

    if (!isAutoMode) {
        if (event.key === 'ArrowUp' && paddleRightY > 0) {
            paddleRightY -= paddleSpeed;
        } else if (event.key === 'ArrowDown' && paddleRightY < gameArea.clientHeight - paddleRight.clientHeight) {
            paddleRightY += paddleSpeed;
        }
    }

    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
});

function moveBall() {
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;


    if (ballPosY <= 0 || ballPosY >= gameArea.clientHeight - ball.clientHeight) {
        ballSpeedY *= -1;
    }

 
    if (
        (ballPosX <= paddleLeft.clientWidth &&
            ballPosY + ball.clientHeight >= paddleLeftY &&
            ballPosY <= paddleLeftY + paddleLeft.clientHeight) ||
        (ballPosX + ball.clientWidth >= gameArea.clientWidth - paddleRight.clientWidth &&
            ballPosY + ball.clientHeight >= paddleRightY &&
            ballPosY <= paddleRightY + paddleRight.clientHeight)
    ) {
        ballSpeedX *= -1;
    }

  
    if (ballPosX <= 0) {
        score2++;
        updateScore();
        resetBall();
    } else if (ballPosX >= gameArea.clientWidth - ball.clientWidth) {
        score1++;
        updateScore();
        resetBall();
    }

    ball.style.left = ballPosX + 'px';
    ball.style.top = ballPosY + 'px';
}

function updateScore() {
    scorePlayer1.textContent = score1;
    scorePlayer2.textContent = score2;
}

function resetBall() {
    ballPosX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
    ballPosY = gameArea.clientHeight / 2 - ball.clientHeight / 2;
    ballSpeedX *= -1; 
}


function autoMovePaddleRight() {
    if (ballPosY > paddleRightY + paddleRight.clientHeight / 2) {
        paddleRightY += paddleSpeed;
    } else if (ballPosY < paddleRightY + paddleRight.clientHeight / 2) {
        paddleRightY -= paddleSpeed;
    }

    paddleRightY = Math.max(0, Math.min(paddleRightY, gameArea.clientHeight - paddleRight.clientHeight));
    paddleRight.style.top = paddleRightY + 'px';
}

function gameLoop() {
    moveBall();
    if (isAutoMode) {
        autoMovePaddleRight();
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();
