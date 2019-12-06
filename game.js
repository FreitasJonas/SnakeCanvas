const CANVAS_ID = "game";

const COLS = 30;
const LINES = 60;

const CEL_SIZE = 12;

const LARGURA = CEL_SIZE * COLS;
const ALTURA = CEL_SIZE * LINES;

const COLUNAS = 12;
const LINHAS = 24;

const BG_COLOR = "#000000";
const CEL_COLOR = "#C0C0C0";
const APPLE_COLOR = "#d12300";

const CIMA = 38;
const BAIXO = 40;
const DIREITA = 39;
const ESQUERDA = 37;

dificuldade = 5;

snakeDir = DIREITA;
//snakeCelSize = { height: (ALTURA / CEL_SIZE), width: (LARGURA / CEL_SIZE) }

snake = [];
snakePosition = { col: 10, line: 10 };
applePosition = { col: 20, line: 10 };

window.onload = function (e) {
    console.log("Ready");

    document.addEventListener('keydown', (event) => {
        this.movimentar(event);
    });

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.canvas.width = LARGURA;
    ctx.canvas.height = ALTURA;

    snake.push(snakePosition);
    snake.push({ col: 9, line: 10 });
    snake.push({ col: 8, line: 10 });
    snake.push({ col: 7, line: 10 });
    snake.push({ col: 6, line: 10 });
    snake.push({ col: 5, line: 10 });
    snake.push({ col: 4, line: 10 });

    window.setInterval(function (e) {

        pintarQuadro();
        processar();
        pintar();

    }, (1000 / dificuldade))
}

function movimentar(event) {

    if (event.keyCode == CIMA) {
        snakeDir = CIMA;
    }
    else if (event.keyCode == BAIXO) {
        snakeDir = BAIXO;
    }
    else if (event.keyCode == DIREITA) {
        snakeDir = DIREITA;
    }
    else if (event.keyCode == ESQUERDA) {
        snakeDir = ESQUERDA;
    }
}

function processar() {

    let headPosition = { col: snake[0].col, line: snake[0].line };

    //movimentacao snake
    if (snakeDir == DIREITA) {
        snake[0].col += 1;
    }
    else if (snakeDir == ESQUERDA) {
        snake[0].col -= 1;
    }
    else if (snakeDir == CIMA) {
        snake[0].line -= 1;
    }
    else if (snakeDir == BAIXO) {
        snake[0].line += 1;
    }

    for (let i = 1; i < snake.length; i++) {

        if (snake[i] != null && snake[i] != undefined) {

            snake[i].col = headPosition.col; 
            snake[i].line = headPosition.line; 

            if (snakeDir == DIREITA) {
                headPosition.col = headPosition.col += 1;
            }
            else if (snakeDir == ESQUERDA) {
                headPosition.col = headPosition.col -= 1;
            }
            else if (snakeDir == CIMA) {
                headPosition.line = headPosition.line -= 1;
            }
            else if (snakeDir == BAIXO) {
                headPosition.line = headPosition.line += 1;
            }
        }
    }

    console.log(snake);

    if (snake[0].col == applePosition.col && snake[0].line == applePosition.line) {
        applePosition = { col: Math.floor(Math.random() * (COLS)), line: Math.floor(Math.random() * (LINES)) }
        //adicionaCorpoSnake();
    }
}

function adicionaCorpoSnake() {

    let lastSnakePositon = snake[snake.length - 1];
    let newSnakeBodyPosition = { col: 0, line: 0 };
    
    if (snakeDir == DIREITA) {
        newSnakeBodyPosition.col = lastSnakePositon.col - 1;
    }
    else if (snakeDir == ESQUERDA) {
        newSnakeBodyPosition.col = lastSnakePositon.col + 1;
    }
    else if (snakeDir == CIMA) {
        newSnakeBodyPosition.line = lastSnakePositon.line - 1;
    }
    else if (snakeDir == BAIXO) {
        newSnakeBodyPosition.line = lastSnakePositon.line + 1;
    }

    snake.push(newSnakeBodyPosition);
}

function pintar() {

    //pintar snake
    let ctx = document.getElementById(CANVAS_ID).getContext("2d");

    ctx.fillStyle = APPLE_COLOR;
    ctx.fillRect(snake[0].col * CEL_SIZE, snake[0].line * CEL_SIZE, CEL_SIZE, CEL_SIZE);

    ctx.fillStyle = CEL_COLOR;
    for (let i = 1; i < snake.length; i++) {

        if (snake[i] != null && snake[i] != undefined) {

            ctx.fillRect(snake[i].col * CEL_SIZE, snake[i].line * CEL_SIZE, CEL_SIZE, CEL_SIZE);
        }
    }

    //pintar apple
    ctx.fillStyle = APPLE_COLOR;
    ctx.fillRect(applePosition.col * CEL_SIZE, applePosition.line * CEL_SIZE, CEL_SIZE, CEL_SIZE);
}

function pintarQuadro() {

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");

    for (let i = 0; i < COLUNAS; i++) {
        for (let j = 0; j < LINHAS; j++) {

            let x = i * CEL_SIZE;
            let y = j * CEL_SIZE;

            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(x, y, LARGURA, ALTURA);
        }
    }
}