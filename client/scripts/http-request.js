const HOST = "localhost"
const PORT = 7000

$(document).ready(function() {

    // $.ajax({
    //     url: `http://${HOST}:${PORT}/verify`,
    //     method: 'GET',
    //     data: null,
    //     success: function(response) {
    //         console.log("success: " + response);
    //     },
    //     error: function(response) {
    //         console.log("error: " + response);
    //     }
    // })
    
    // $.ajax({
    //     url: `http://${HOST}:${PORT}/send-player-name`,
    //     method: 'POST',
    //     data: { playerName: "Jonas Teste" },
    //     success: function(response) {
    //         console.log("success: " + response);
    //     },
    //     error: function(response) {
    //         console.log("error: " + response);
    //     }
    // })
})

function getParans() {

    console.log("getParans");

    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `http://${HOST}:${PORT}/get-parans`,
            method: 'GET',
            data: null,
            success: function(response) {

                setTimeout(resolve(response), (5 * 1000))
                //resolve(response);
            },
            error: function(response) {
                reject(response);
            }
        })
    })    
}