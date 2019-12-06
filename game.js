const CANVAS_ID = "game";

const COLUMNS = 20;
const LINES = 40;

const CEL_SIZE = 12;

const WIDTH = CEL_SIZE * COLUMNS;
const HEIGHT = CEL_SIZE * LINES;

const BG_COLOR = "#000000";
const CEL_COLOR = "#C0C0C0";
const APPLE_COLOR = "#d12300";

const KEYCODE_UP = 38;
const KEYCODE_DOW = 40;
const KEYCODE_RIGTH = 39;
const KEYCODE_LEFT = 37;

DEFICULTY = 5;

snakeDirection = KEYCODE_RIGTH;

snake = [];
snakePosition = { col: 10, line: 10 };
applePosition = { col: 19, line: 10 };

window.onload = function (e) {
    console.log("Ready");

    document.addEventListener('keydown', (event) => {
        this.actionCapture(event);
    });

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;

    snake.push(snakePosition);

    window.setInterval(function (e) {

        drawBoard();
        processGame();
        drawElements();

    }, (1000 / DEFICULTY))
}

function actionCapture(event) {

    if (event.keyCode == KEYCODE_UP && snakeDirection !== KEYCODE_DOW) {
        snakeDirection = KEYCODE_UP;
    }
    else if (event.keyCode == KEYCODE_DOW && snakeDirection !== KEYCODE_UP) {
        snakeDirection = KEYCODE_DOW;
    }
    else if (event.keyCode == KEYCODE_RIGTH && snakeDirection !== KEYCODE_LEFT) {
        snakeDirection = KEYCODE_RIGTH;
    }
    else if (event.keyCode == KEYCODE_LEFT && snakeDirection !== KEYCODE_RIGTH) {
        snakeDirection = KEYCODE_LEFT;
    }
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

    for (let i = 1; i < snake.length; i++) {

        if (snake[i] != null && snake[i] != undefined) {

            let pos = { col: snake[i].col, line: snake[i].line };

            snake[i].col = anchorPosition.col; 
            snake[i].line = anchorPosition.line; 

            anchorPosition = pos;
        }
    }

    //if colide apple
    if (snake[0].col == applePosition.col && snake[0].line == applePosition.line) {
        applePosition = { col: Math.floor(Math.random() * (COLUMNS)), line: Math.floor(Math.random() * (LINES)) }
        addBodyUnity();
    }
}

function addBodyUnity() {

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

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");

    for (let i = 0; i < COLUMNS; i++) {
        for (let j = 0; j < LINES; j++) {

            let x = i * CEL_SIZE;
            let y = j * CEL_SIZE;

            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(x, y, WIDTH, HEIGHT);
        }
    }
}