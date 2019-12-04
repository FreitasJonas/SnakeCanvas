const CANVAS_ID = "game";

const LARGURA = 400;
const ALTURA = 600;

const COLUNAS = 12;
const LINHAS = 24;

const BG_COLOR = "#000000";
const CEL_COLOR = "#C0C0C0";
const APPLE_COLOR = "#d12300";

const CIMA = 38;
const BAIXO = 40;
const DIREITA = 39;
const ESQUERDA = 37;

dificuldade = 10;

snakeDir = DIREITA;
snakeCelSize = { height: (ALTURA / 50), width: (LARGURA / 50) }

snakePosition = { col: 10, line: 10};
snake = [];

applePosition = { x: Math.floor(Math.random() * (LARGURA)), y: 100 }

tabuleiro = [];
celSize = 50;

window.onload = function(e) {
    console.log("Ready");

    document.addEventListener('keydown', (event) => {
        this.movimentar(event);
    });

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.canvas.width = LARGURA;
    ctx.canvas.height = ALTURA;   
    
    snake.push(snakePosition);


    window.setInterval(function(e) {
        
        pintarQuadro();
        //processar();
        pintar();

    }, (1000 / dificuldade))
}

function movimentar(event) {

    if(event.keyCode == CIMA) {
        snakeDir = CIMA;
    }
    else if(event.keyCode == BAIXO) {
        snakeDir = BAIXO;
    }
    else if(event.keyCode == DIREITA) {
        snakeDir = DIREITA;
    }
    else if(event.keyCode == ESQUERDA) {
        snakeDir = ESQUERDA;
    }
}

function processar() {

    //movimentacao snake
    if(snakeDir == DIREITA) {
        snake[0].x += snakeCelSize.width;
    }
    else if(snakeDir == ESQUERDA) {
        snake[0].x -= snakeCelSize.width;
    }
    else if(snakeDir == CIMA) {
        snake[0].y -= snakeCelSize.height;
    }
    else if(snakeDir == BAIXO) {
        snake[0].y += snakeCelSize.height;
    }
    
    for(let i = 1; i < snake.length; i++) {
        
        if(snake[i] != null && snake[i] != undefined) {
            
            snake[i] = snake[i - 1];
        }
    }

    let xPos = snake[0].x - applePosition.x;
    let yPos = snake[0].y - applePosition.y;

    let rangeX = 10;
    let rangeY = 20;

    if((xPos >= 0 && xPos < rangeX) && (yPos >= 0 && yPos < rangeY)) {
        applePosition = { x: Math.floor(Math.random() * (LARGURA)), y: Math.floor(Math.random() * (ALTURA)) }
        snake.push({ x: snake[0].x + snakeCelSize.width, y: snake[0].y + snakeCelSize.height })
    } 
}

function pintar() {
    
    //pintar snake
    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.fillStyle = CEL_COLOR;

    for(let i = 0; i < snake.length; i++) {
        
        if(snake[i] != null && snake[i] != undefined) {

            ctx.fillRect(snake[i].col, snake[i].line, snakeCelSize.width, snakeCelSize.height);
        }
    }    

    //pintar apple
    ctx.fillStyle = APPLE_COLOR;
    ctx.fillRect(applePosition.x, applePosition.y, snakeCelSize.width, snakeCelSize.height);
}

function pintarQuadro() {

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
        
    for(let i = 0; i < COLUNAS; i++) {
        for(let j = 0; j < LINHAS; j++) {
            
            let x = i * celSize;
            let y = j * celSize;

            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(0, 0, LARGURA, ALTURA);                        
        }
    }
}