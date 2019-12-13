const CANVAS_ID = "game";

// const COLUMNS = 30;
// const LINES = 50;

// const CEL_SIZE = 12;

// const WIDTH = CEL_SIZE * COLUMNS;
// const HEIGHT = CEL_SIZE * LINES;

// const BG_COLOR = "#000000";
// const CEL_COLOR = "#C0C0C0";
// const APPLE_COLOR = "#d12300";

const KEYCODE_UP = 38;
const KEYCODE_DOW = 40;
const KEYCODE_RIGTH = 39;
const KEYCODE_LEFT = 37;
const KEYCODE_SPACE_BAR = 32;

var parans = null;
var interval = null;

var score = 0;
var DIFICULTY = 15;
var snakeDirection = KEYCODE_RIGTH;
var snake = [];
var applePosition = { col: 19, line: 10 };

moveFunctions = {
    ArrowUp: function () {
        console.log("ArrowUp()")

        if (snakeDirection !== KEYCODE_DOW) {
            snakeDirection = KEYCODE_UP;
        }
    },
    ArrowDown: function () {
        console.log("ArrowDown()")

        if (snakeDirection !== KEYCODE_UP) {
            snakeDirection = KEYCODE_DOW;
        }
    },
    ArrowRight: function () {
        console.log("ArrowRight()")

        if (snakeDirection !== KEYCODE_LEFT) {
            snakeDirection = KEYCODE_RIGTH;
        }
    },
    ArrowLeft: function () {
        console.log("ArrowLeft()")

        if (snakeDirection !== KEYCODE_RIGTH) {
            snakeDirection = KEYCODE_LEFT;
        }
    }
}

window.onload = function (e) {
    console.log("Ready");

    document.getElementById("scoreText").innerText = "Score: " + score;
    document.addEventListener('keydown', (event) => {

        let fnMove = moveFunctions[event.key];
            if (fnMove) {
                fnMove();
            }
        }
    );

    snake.push({ col: 10, line: 10 });

    // game layer
    interval = window.setInterval(function (e) {

        //getParans().then(updateParans);

        if(parans) {
            drawBoard();
            processGame();
            drawElements();
        }        
    }, (1000 / 5) )
}

function updateParans(response) {
    console.log("updateParans");

    parans = response;
    response = null;

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.canvas.width = parans.WIDTH;
    ctx.canvas.height = parans.HEIGHT;
}

function processGame() {

    let anchorPosition = { col: snake[0].col, line: snake[0].line };

    //movimentation snake
    if (snakeDirection == KEYCODE_RIGTH) {
        snake[0].col += 1;
    }
    else if (snakeDirection == KEYCODE_LEFT) {
        snake[0].col -= 1;
    }
    else if (snakeDirection == KEYCODE_UP) {
        snake[0].line -= 1;
    }
    else if (snakeDirection == KEYCODE_DOW) {
        snake[0].line += 1;
    }

    if (snake[0].col >= COLUMNS) {
        snake[0].col = 0;
    }
    else if (snake[0].col < 0) {
        snake[0].col = COLUMNS;
    }
    else if (snake[0].line >= LINES) {
        snake[0].line = 0;
    }
    else if (snake[0].line < 0) {
        snake[0].line = LINES;
    }

    for (let i = 1; i < snake.length; i++) {

        if (snake[i] != null && snake[i] != undefined) {

            //if colide with self body
            if (snake[0].col == snake[i].col && snake[0].line == snake[i].line) {
                window.clearInterval(interval);
            }

            let pos = { col: snake[i].col, line: snake[i].line };

            snake[i].col = anchorPosition.col;
            snake[i].line = anchorPosition.line;

            anchorPosition = pos;
        }
    }

    //if colide apple
    if (snake[0].col == applePosition.col && snake[0].line == applePosition.line) {
        applePosition = { col: Math.floor(Math.random() * (COLUMNS)), line: Math.floor(Math.random() * (LINES)) }
        addBodyCel();
        score++;
        document.getElementById("scoreText").innerText = "Score: " + score;
    }
}

function addBodyCel() {

    let lastSnakePositon = snake[snake.length - 1];
    let newSnakeBodyPosition = { col: lastSnakePositon.col, line: lastSnakePositon.line };

    if (snakeDirection == KEYCODE_RIGTH) {
        newSnakeBodyPosition.col = lastSnakePositon.col - 1;
    }
    else if (snakeDirection == KEYCODE_LEFT) {
        newSnakeBodyPosition.col = lastSnakePositon.col + 1;
    }
    else if (snakeDirection == KEYCODE_UP) {
        newSnakeBodyPosition.line = lastSnakePositon.line - 1;
    }
    else if (snakeDirection == KEYCODE_DOW) {
        newSnakeBodyPosition.line = lastSnakePositon.line + 1;
    }

    snake.push(newSnakeBodyPosition);
}

function drawElements() {

    //draw snake
    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.fillStyle = CEL_COLOR;

    for (let i = 0; i < snake.length; i++) {

        if (snake[i] != null && snake[i] != undefined) {

            ctx.fillRect(snake[i].col * CEL_SIZE, snake[i].line * CEL_SIZE, CEL_SIZE, CEL_SIZE);
        }
    }

    //draw apple
    ctx.fillStyle = APPLE_COLOR;
    ctx.fillRect(applePosition.col * CEL_SIZE, applePosition.line * CEL_SIZE, CEL_SIZE, CEL_SIZE);
}

function drawBoard() {
    console.log("drawBoard()");

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");

    for (let i = 0; i < parans.COLUMNS; i++) {
        for (let j = 0; j < parans.LINES; j++) {

            let x = i * parans.CEL_SIZE;
            let y = j * parans.CEL_SIZE;

            ctx.fillStyle = parans.BG_COLOR;
            ctx.fillRect(x, y, parans.WIDTH, parans.HEIGHT);
        }
    }
}

