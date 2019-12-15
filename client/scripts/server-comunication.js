let client = null;

$(document).ready(function () {

    client = new WebSocket('ws://localhost:9898/');

    client.onopen = function () {
        client.send(JSON.stringify(
            {
                command: 'OpenConnection'
            }));
    };

    client.onmessage = function (e) {

        let obj = JSON.parse(e.data);
        let fn = comunicateRecieveFunctions[obj.command];

        if (fn) {
            fn(obj);
        }
    };
})

function SendCommand(command) {
    client.send(JSON.stringify(command));
}
