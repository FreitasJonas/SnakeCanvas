const CANVAS_ID = "game";

const ALTURA = 600;
const LARGURA = 400;

const BG_COLOR = "#000000";
const CEL_COLOR = "#C0C0C0";
const APPLE_COLOR = "#d12300";

const CIMA = 38;
const BAIXO = 40;
const DIREITA = 39;
const ESQUERDA = 37;

dificuldade = 5;

snakeDir = DIREITA;
snakeCelSize = { height: (ALTURA / 100), width: (LARGURA / 100) }
snakePosition = { x: 100, y: 100};

applePosition = { x: Math.floor(Math.random() * (LARGURA)), y: 100 }

window.onload = function(e) {
    console.log("Ready");

    document.addEventListener('keydown', (event) => {
        this.movimentar(event);
    });

    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.canvas.width = LARGURA;
    ctx.canvas.height = ALTURA;    

    window.setInterval(function(e) {
        
        pintarQuadro();
        processar();
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
        snakePosition.x += snakeCelSize.width;
    }
    else if(snakeDir == ESQUERDA) {
        snakePosition.x -= snakeCelSize.width;
    }
    else if(snakeDir == CIMA) {
        snakePosition.y -= snakeCelSize.height;
    }
    else if(snakeDir == BAIXO) {
        snakePosition.y += snakeCelSize.height;
    }

    console.log("S " + JSON.stringify(snakePosition));
    console.log("A" + JSON.stringify(applePosition));

    //aplle respawn
    let xPos = snakePosition.x - applePosition.x;
    let yPos = snakePosition.y - applePosition.y;

    let rangeX = 2;
    let rangeY = 2;

    if((xPos > 0 && xPos < rangeX) && (yPos > 0 && yPos < rangeY)) {
        applePosition = { x: Math.floor(Math.random() * (LARGURA)), y: Math.floor(Math.random() * (ALTURA)) }
    }       
}

function pintar() {
    
    //pintar snake
    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.fillStyle = CEL_COLOR;
    ctx.fillRect(snakePosition.x, snakePosition.y, snakeCelSize.width, snakeCelSize.height);

    //pintar apple
    ctx.fillStyle = APPLE_COLOR;
    ctx.fillRect(applePosition.x, applePosition.y, snakeCelSize.width, snakeCelSize.height);
}

function pintarQuadro() {
    
    let ctx = document.getElementById(CANVAS_ID).getContext("2d");
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, LARGURA, ALTURA);
}