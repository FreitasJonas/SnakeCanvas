const CANVAS_ID = "game";

var COLUMNS = 30;
var LINES = 50;

var CEL_SIZE = 12;

var WIDTH = CEL_SIZE * COLUMNS;
var HEIGHT = CEL_SIZE * LINES;

var BG_COLOR = "#000000";
var CEL_COLOR = "#C0C0C0";
var APPLE_COLOR = "#d12300";

const KEYCODE_UP = 38;
const KEYCODE_DOW = 40;
const KEYCODE_RIGTH = 39;
const KEYCODE_LEFT = 37;
const KEYCODE_SPACE_BAR = 32;

var interval = null;

var score = 0;
var DIFICULTY = 5;
var snakeDirection = KEYCODE_RIGTH;
var snake = [];
var applePosition = { col: 19, line: 10 };

var sessionID = "";
var clientID = 999;

var readyToPlay = false;

moveFunctions = {
    ArrowUp: function () {

        if (snakeDirection !== KEYCODE_DOW) {
            snakeDirection = KEYCODE_UP;
        }
    },
    ArrowDown: function () {

        if (snakeDirection !== KEYCODE_UP) {
            snakeDirection = KEYCODE_DOW;
        }
    },
    ArrowRight: function () {

        if (snakeDirection !== KEYCODE_LEFT) {
            snakeDirection = KEYCODE_RIGTH;
        }
    },
    ArrowLeft: function () {

        if (snakeDirection !== KEYCODE_RIGTH) {
            snakeDirection = KEYCODE_LEFT;
        }
    }
}

comunicateRecieveFunctions = {
    OpenResponse: function(response) {
        //console.log(JSON.stringify(response));

        document.getElementById("session-id").innerText = "Session: " + response.sessionId;
        document.getElementById("client-id").innerText = "Client ID: " + response.clientId;

        sessionID = response.sessionId;
        clientID = response.clientId;

        snakeDirection = response.content.snakeDirection;
        snake[0].col = response.content.snake[0].col;
        snake[0].line = response.content.snake[0].line;

        COLUMNS = response.parans.COLUMNS;
        LINES = response.parans.LINES;
        CEL_SIZE = response.parans.CEL_SIZE;
        WIDTH = response.parans.WIDTH;
        HEIGHT = response.parans.HEIGHT;

        BG_COLOR = response.parans.BG_COLOR;
        CEL_COLOR = response.parans.CEL_COLOR;
        APPLE_COLOR = response.parans.APPLE_COLOR;     
        
        DIFICULTY = response.parans.DIFICULTY;

        readyToPlay = true;
    },
    MovimentResponse: function(response) {
        console.log("MovimentResponse");
    },
    OnError: function(response) {
        alert(response.error);
    }
}
