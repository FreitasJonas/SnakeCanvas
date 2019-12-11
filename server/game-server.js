const gc = require('./game-controller');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const PORT = 7000
const IP = 'localhost'

app.use(cors())

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/verify', function (req, res, next) {
    res.json('Server OK!')
})

app.get('/conect', function (req, res, next) {
    res.json('Connected');
})

app.get('/get-parans', function (req, res, next) {
    res.json(gc.getParans());
})

app.post('/send-player-name', function(req, res) {
    var user_id = req.body.playerName;
    res.send("Recebido " + user_id);
});


app.listen(PORT, IP, function () {
    console.log(`Servidor rodando em http://${IP}:${PORT}`);
    console.log('Para derrubar o servidor: ctrl + c');
})
