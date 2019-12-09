const HOST = "localhost"
const PORT = 7000

$(document).ready(function() {

    $.ajax({
        url: `http://${HOST}:${PORT}/verificar`,
        method: 'GET',
        data: null,
        success: function(response) {
            console.log("success: " + response);
        },
        error: function(response) {
            console.log("error: " + response);
        }
    })    
})