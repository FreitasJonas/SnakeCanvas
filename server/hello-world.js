var express = require('express')
const cors = require('cors');
const app = express();

app.use(cors())

const PORT = 7000
const IP = 'localhost'

app.get('/verificar', function (req, res, next) {
    res.json('Servidor OK!')
})

app.listen(PORT, IP, function () {
    console.log(`Servidor rodando em http://${IP}:${PORT}`);
    console.log('Para derrubar o servidor: ctrl + c');
})