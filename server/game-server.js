// Node.js WebSocket server script
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
const gc = require('./game-controller');

server.listen(9898, 'localhost', () => {
    InitSession();
});

session = { id: "123456", clients: [] }
sessions = [session];

lastIndexClient = 0;

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {

    const connection = request.accept(null, request.origin);
    
    //sessions[0].clients.push({ connection: connection, clientId: request.key });
    if(!AddClient(connection, request.key)) {
        connection.sendUTF(JSON.stringify(
            { 
                command: "OnError",
                error: "Não há sessão disponível!",
            }));
    }

    connection.on('message', function (message) {

        let obj = JSON.parse(message.utf8Data);
        let fn = comunicateFunctions[obj.command];

        if (fn) {
            fn(connection, request, obj);
        }
        else {
            connection.sendUTF('Hi this is WebSocket server!');
        }

        // sessions[0].clients.forEach(client => {
        //     client.connection.send('Emissão para todos os clientes');
        // });
    });

    connection.on('close', function (reasonCode, description) {
        RemoveClient(request);
    });
});

comunicateFunctions = {
    OpenConnection: function (connection, request, context) {

        let _parans = gc.getParans();
        let clientInfo = getClientById(request.key);

        if(clientInfo) {

            connection.send(JSON.stringify({
                command: "OpenResponse",
                clientId: clientInfo.client.clientId,
                sessionId: sessions[0].id,
                content: {
                    snake: clientInfo.client.snake,
                    snakeDirection: gc.getDirections().KEYCODE_UP
                },
                parans: _parans
            }));
        }
        else {
            connection.send(JSON.stringify(
                { 
                    command: "OnError",
                    error: "Não foi possível localizar o cliente!",
                }));
        }
    },
    PlayerMoviment: function (connection, request, context) {

        let ctx = JSON.parse(context);
    }
}

function getClientById(clientId) {

    for(let i= 0; i < sessions[0].clients.length; i++) {

        if(sessions[0].clients[i].clientId == clientId) {
            return {
                client: sessions[0].clients[i],
                index: i
            }
        }
    }

    return {
        client: null,
        index: 0
    }
}

function InitSession() {

    let sessionSize = 5;

    for(let i = 0; i < sessionSize; i++) {
        sessions[0].clients.push({ connection: null, clientId: 0, snake: [] });
    }    
}

function AddClient(connection, clientId) {

    let clientInfo = getClientById(clientId);
    console.log(clientInfo);

    let _parans = gc.getParans();

    let intervalo = 5;
    let linhaInicial = 45;

    for(let i = 0; sessions[0].clients.length; i++) {
        if(sessions[0].clients[i].clientId == 0) {
            sessions[0].clients[i] = { connection: connection, clientId: clientId, snake: [] };

            sessions[0].clients[i].snake.push({
                col: clientInfo.index * (_parans.COLUMNS / intervalo),
                line: linhaInicial
            });

            return true;
        }
    }

    return false;
}

function RemoveClient(request) {
    for (let i = 0; i < sessions[0].clients.length; i++) {
        if (sessions[0].clients[i].clientId == request.key) {
            console.log('Cliente desconectado: ' + sessions[0].clients[i].clientId);
            sessions[0].clients[i] = { connection: null, clientId: 0 }
            break;
        }
    }
}

