// Node.js WebSocket server script
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();

server.listen(9898);

session = { id: "123456", clients: [] }
sessions = [session];

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {

    const connection = request.accept(null, request.origin);
    sessions[0].clients.push({ connection: connection, key: request.key });
    console.log("Cliente conectado! \nKey: " + request.key + " Sessão: " + sessions[0].id);

    connection.on('message', function(message) {

        let obj = JSON.parse(message.utf8Data);

        if(obj.msg == 'Open') {
            connection.send("Conectado! \nKey: " + request.key + " Sessão: " + sessions[0].id);
        }
        else if (obj.msg == 'Emitir') {

            sessions[0].clients.forEach(client => {
                client.connection.send('Emissão para todos os clientes');
            });
        }
        else {
            connection.sendUTF('Hi this is WebSocket server!');
        }
    });
    
    connection.on('close', function(reasonCode, description) {
        for(let i = 0; i < sessions[0].clients.length; i++) {
            if(sessions[0].clients[i].key == request.key) {
                console.log('Cliente desconectado: ' + sessions[0].clients[i].key);
                sessions[0].clients.splice(i, 1);
                break;
            }
        }
    });
});
